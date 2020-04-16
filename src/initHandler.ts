import path from "path"
import fileHandler from "./fileHandler"
import logger from "./logger"
import cli from "./cli"
import configHandler from "./configHandler"

/**
 * Sets up the current directory to contain all necessary items to start writing docs.
 * Creates:
 *  - gendocs.json
 *  - gendocs-token
 *  - .gitignore (appends to it, if it already exists after prompting)
 */
async function init(name: string, token: string) {
  if (fileHandler.fileExists(configHandler.configFilePath())) {
    const shouldOverwrite = await cli.promptOverwrite("gendocs.json")
    if (!shouldOverwrite) return
  }

  if (fileHandler.fileExists(configHandler.tokenFilePath())) {
    const shouldOverwrite = await cli.promptOverwrite("gendocs-token")
    if (!shouldOverwrite) return
  }

  await configHandler.createConfigFile(name)
  await configHandler.createTokenFile(token)

  if (fileHandler.fileExists(gitIgnorePath())) {
    fileHandler.appendToFile(gitIgnorePath(), "# Gendocs token file\ngendocs-token\n")
  } else {
    fileHandler.createAndWrite(gitIgnorePath(), "gendocs-token\n")
  }
}

function gitIgnorePath() {
  return path.join(basePath(), ".gitignore")
}

function basePath() {
  return process.cwd()
}

export default {
  init
}
