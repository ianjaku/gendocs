import fs from "fs"

function readFileSync(path: string) {
  const buffer = fs.readFileSync(path)
  return buffer.toString('utf-8')
}

function readJSONFileSync(path: string) {
  const resultJSON = readFileSync(path)
  return JSON.parse(resultJSON)
}

function fileExists(path: string) {
  return fs.existsSync(path)
}

function createAndWrite(path: string, contents: string) {
  fs.writeFileSync(path, contents)
}

function appendToFile(path: string, contents: string) {
  fs.appendFileSync(path, contents)
}

export default {
  readFileSync,
  readJSONFileSync,
  fileExists,
  createAndWrite,
  appendToFile
}
