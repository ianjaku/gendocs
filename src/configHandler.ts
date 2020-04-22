import fs from "fs"
import path from "path"
import cli from "./cli"
import logger from "./logger"
import fileHandler from "./fileHandler"

export interface Config {
  name: string;
  token?: string;
  pages: string[];
  sourcePath?: string;
  description?: string;
  keywords?: string;
}

async function createConfigFile(
  name: string,
  token: string | null = null,
  keywords: string = "",
  description: string = ""
) {
  const contents: Config = { name, pages: [], keywords, description }
  if (token != null) {
    contents["token"] = token
  }

  fileHandler.createAndWrite(configFilePath(), JSON.stringify(contents, null, "\t"))
}

async function readConfigFile(): Promise<Config | null> {
  if (!fs.existsSync(configFilePath())) {
    return null
  }

  return fileHandler.readJSONFileSync(configFilePath())
}

async function updateConfig(updates: any): Promise<void> {
  const config: any = await readConfigFile()
  for (const key in updates) {
    config[key] = updates[key]
  }
  fs.writeFileSync(configFilePath(), JSON.stringify(config, null, "\t"))
}

async function createTokenFile(token: string) {
  fileHandler.createAndWrite(tokenFilePath(), token)
}

async function readTokenFile(): Promise<string | null> {
  if (!fs.existsSync(tokenFilePath())) {
    return null
  }

  const contents = fileHandler.readFileSync(tokenFilePath())
  return contents.trim()
}

function configFilePath() {
  return path.join(basePath(), "gendocs.json")
}

function tokenFilePath() {
  return path.join(basePath(), "gendocs-token")
}

function basePath() {
  return process.cwd()
}

export default {
  createConfigFile,
  readConfigFile,
  updateConfig,
  readTokenFile,
  configFilePath,
  tokenFilePath,
  createTokenFile
}