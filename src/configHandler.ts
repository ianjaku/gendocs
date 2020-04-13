import fs from "fs"
import path from "path"
import cli from "./cli"
import logger from "./logger"

interface Config {
  name: string;
  token: string;
  pages: string[];
  sourcePath: string;
}

async function createConfigFile(token: string, name: string) {
  if (fs.existsSync(configFilePath())) {
    const prompt = await cli.promptConfirm("The file already exists, overwrite?")
    if (prompt.result === false) return
  }
  
  const contents = {
    name,
    token,
    pages: []
  }
  fs.writeFileSync(configFilePath(), JSON.stringify(contents, null, "\t"))
}

async function readConfigFile(): Promise<Config> {
  if (!fs.existsSync(configFilePath())) {
    throw Error(`
      Config file could not be found.
      Use "gendocs init" to generate the config file.
    `)
  }

  const buffer = fs.readFileSync(configFilePath())
  const resultJSON = buffer.toString('utf-8')
  const result = JSON.parse(resultJSON)
  return result
}

function configFilePath() {
  return path.join(process.cwd(), "gendocs.json")
}

export default {
  createConfigFile,
  readConfigFile
}