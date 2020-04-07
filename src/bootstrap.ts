import argv from 'yargs'
import commandHandler from "./commandHandler"

export function run() {
  argv()
  commandHandler.run()
}

export default {
  run
}


/*
  Commands:
  - gendocs help
  - gendocs register
  - gendocs document:create
  
  - gendocs document:list
  - gendocs init [token]
  - gendocs publish
*/
