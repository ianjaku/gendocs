import commandMessages from "./commandMessages"
import logger from "./logger"
import cli from "./cli"
import repotisory from "./repository"

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