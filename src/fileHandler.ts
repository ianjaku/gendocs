import fs from "fs"

function readFileSync(path: string) {
  const buffer = fs.readFileSync(path)
  return buffer.toString('utf-8')
}

function readJSONFileSync(path: string) {
  const resultJSON = readFileSync(path)
  return JSON.parse(resultJSON)
}

function createReadStream(path: string) {
  return fs.createReadStream(path)
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

function fileSize(path: string) {
  const stats = fs.statSync(path)
  return stats["size"]
}

export default {
  readFileSync,
  readJSONFileSync,
  fileExists,
  createAndWrite,
  appendToFile,
  createReadStream,
  fileSize
}
