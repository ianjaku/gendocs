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

  TODO: Custom URL

  TODO: show error when insert fails (when meilisearch is down for example)

  TODO: docs:rename

  TODO: docs:delete

  TODO: test if email exists before entering password
*/
