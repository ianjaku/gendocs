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
  - gendocs docs:create
  - gendocs docs:list
  - gendocs init
  - gendocs publish

  - gendocs subdomain

  - gendocs domains:add
  - gendocs domains:list

  // TODO: init should download the existing pages

  // TODO: show error when insert fails (when meilisearch is down for example)

  // TODO: if certificate already exists, overwrite/keep (so we don't get stuck)

*/
