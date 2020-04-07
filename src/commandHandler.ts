import commandMessages from "./commandMessages"
import logger from "./logger"
import cli from "./cli"
import repotisory from "./repository"
import configHandler from "./configHandler"

const _handlers: {[command: string]: (args: string[]) => void} = {
  help: (args: string[]) => {
    if (args.length > 0) {
      const target: string = args[0]
      if (target in commandMessages) {
        logger.info(commandMessages[target]())
        return
      }
    }
    logger.info(commandMessages.help())
  },
  "register": async (args: string[]) => {
    const {email, password} = await cli.promptCredentials()
    try {
      await repotisory.createUser(email, password)
      logger.info("Registration was succesful!")
    } catch (e) {
      handleRepositoryError(e)
    }
  },
  "document:create": async (args: string[]) => {
    const {email, password} = await cli.promptCredentials()
    const {name} = await cli.promptCreateDocument()
    try {
      const response = await repotisory.createDocument(name, email, password)
      logger.info(`Document created successfully! Your token: ${response.doc.token}`)
    } catch (e) {
      handleRepositoryError(e)
    }
  },
  "document:list": async (args: string[]) => {
    const {email, password} = await cli.promptCredentials()
    try {
      const response = await repotisory.listDocuments(email, password)
      logger.info("[Your documents]")
      response.docs.forEach((doc: any) => {
        logger.info(`- ${doc.name} : ${doc.token}`)
      });
    } catch (e) {
      handleRepositoryError(e)
    }
  },
  init: async (args: string[]) => {
    const {token} = await cli.promptToken()
    try {
      const response = await repotisory.singleDocument(token)
      await configHandler.createConfigFile(token, response.doc.name)
    } catch (e) {
      handleRepositoryError(e)
    }
  }
}

function handleRepositoryError(e: any) {
  if (e.response.status != null) {
    if (e.response.status === 401) {
      logger.error("Unauthorized")
      return
    }
  }
  if (e.response != null && e.response.data != null && e.response.data.errors != null) {
    const errors = e.response.data.errors
    for (const key in errors) {
      for (const message of errors[key]) {
        logger.error(`${key} ${message}`)
      }
    }
  } else {
    logger.error(e.message)
  }
}

function run() {
  if (process.argv.length < 3) {
    logger.info(commandMessages.help())
    return
  }

  const command: string = process.argv[2]
  if (!(command in _handlers)) {
    logger.info(commandMessages.help())
    return
  }

  let args: string[] = []
  if (process.argv.length > 3) {
    args = process.argv.slice(3)
  }

  _handlers[command](args)
}

export default {
  run
}