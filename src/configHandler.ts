import fs from "fs"
import path from "path"
import cli from "./cli"

async function createConfigFile(token: string, name: string) {
  const filePath = path.join(process.cwd(), "gendocs.json")

  if (fs.existsSync(filePath)) {
    const prompt = await cli.promptConfirm("The file already exists, overwrite?")
    if (prompt.result === false) return
  }
  
  const contents = {
    name,
    token
  }
  fs.writeFileSync(filePath, JSON.stringify(contents, null, "\t"))
}

export default {
  createConfigFile
}