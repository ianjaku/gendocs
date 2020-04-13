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

  TODO: Show all urls to reach your page after publishing
  TODO: Show all urls in document listing

  // TODO: init should download the existing pages
  TODO: allow for token to be given with the gendocs publish [token] command so that it doesn't have to be loaded from the config.

  TODO: Invitation token to be able to join
  TODO: A way to create invitation tokens

  TODO: Custom URL

  TODO: show error when insert fails (when meilisearch is down for example)

  TODO: projects:rename

  TODO: projects:delete

  TODO: projects:get-token

  TODO: test if email exists before entering password
*/
