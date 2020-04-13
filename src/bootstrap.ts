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

  TODO: update application name in config after rename

  TODO: limit docs that a user can create (add to invitation) and/or amount of pages in total?
*/
