import commandMessages from "./commandMessages"
import logger from "./logger"
import cli from "./cli"
import configHandler from "./configHandler"
import documentHandler from "./documentHandler"
import repository from "./repository"
import path from "path"
import authHandler from "./authHandler"

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
    logger.info(`
      Registration is currently only possible after an invitation.
      If you would to use Gendocs please send an email to ian@invacto.com
    `)
    const invitation = await cli.promptInvitation()

    try {
      await repository.validateInvitation(invitation)
    } catch (e) {
      if (e.response.status === 401) {
        logger.info(`
          The given invitation is invalid or has already been used.
        `)
      } else {
        throw e
      }
      return
    }
    
    const email = await cli.promptEmail()
    const validationResult = await repository.doesEmailExist(email)
    if (validationResult.exists) {
      logger.info(`
        That email address has already been used.
      `)
      return
    }
    
    const password = await cli.promptPassword()
    try {
      await repository.createUser(invitation, email, password)
      logger.info("Registration was succesful!")
    } catch (e) {
      if (e.response.status === 401) {
        logger.info(`
          The given invitation is invalid or has already been used.
        `)
        return
      }
      throw e
    }
  },
  "docs:create": async (args: string[]) => {
    const email = await cli.promptEmail()
    const password = await cli.promptPassword()
    const name = await cli.promptDocName()

    const response = await repository.createDocument(name, email, password)
    logger.info(`Document created successfully! Your token: ${response.doc.token}`)
  },
  "docs:list": async (args: string[]) => {
    const email = await cli.promptEmail()
    const password = await cli.promptPassword()

    const response = await repository.listDocuments(email, password)
    logger.info(`
      [Your documents]
    `)
    response.docs.forEach((doc: any) => {
      logger.info(`- ${doc.name} : ${doc.token} @ ${doc.full_subdomain}`)
    });
  },
  "docs:rename": async (args: string[]) => {
    const token = await authHandler.getToken()
    if (token == null) return
    
    const name = await cli.promptDocName()
    if (name == null) return

    await repository.updateDocument(token, { name })
    logger.info(`Doc has been updated.`)
  },
  init: async (args: string[]) => {
    const token = await cli.promptToken()

    const response = await repository.singleDocument(token)
    await configHandler.createConfigFile(token, response.doc.name)
  },
  publish: async (args: string[]) => {
    let {token, pages, sourcePath} = await configHandler.readConfigFile()
    if (token == null && pages != null && args.length > 0) {
      token = args[0]
    }
    if (sourcePath != null) {
      pages = pages.map(p => path.join(sourcePath, p))
    }
    const generatedPages = documentHandler.loadPages(pages)

    const result = await repository.publish(token, generatedPages)
    logger.info(`
      Succesfully updated your documentation!
      Your site is available at: ${result.doc.full_subdomain}
    `)
  },
  "subdomain:set": async (args: string[]) => {
    const token = await authHandler.getToken()
    if (token == null) return

    updateSubdomain(token)
  }
  // "domains:add": async (args: string[]) => {
  //   let { token } = await configHandler.readConfigFile()
  //   if (token == null) {
  //     token = (await cli.promptToken()).token
  //   }
  //   if (token == null) return
  //   const { domain } = await cli.promptDomain()
  //   try {
  //     await repository.addDomain(token, domain)
  //     logger.info("Your domain has been added, it might take a minute for the ssl certificate to be generated.")
  //   } catch (e) {
  //     handleRepositoryError(e)
  //   }
  // }
}

async function updateSubdomain(token: string) {
  let {subdomain} = await cli.promptSubdomain()
  if (subdomain == null) return

  try {
    const result = await repository.tryAddingSubdomain(token, subdomain)
    logger.info(`
      Your site is now available at: ${result.doc.full_subdomain}
    `)
  } catch (e) {
    if (e.response.status === 400) {
      logger.info(`Subdomain "${subdomain}" has already been taken.`)
      updateSubdomain(token)
    }
  }
}

function handleCommandHandlerError(e: any) {
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

async function run() {
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

  try {
    await Promise.resolve(_handlers[command](args))
  } catch (e) {
    handleCommandHandlerError(e)
  }
}

export default {
  run
}