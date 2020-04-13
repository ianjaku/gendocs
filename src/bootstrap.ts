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
    - 1. user provides URL
    - 2. test if CNAME has been set
      no -> provide instructions to set CNAME
      yes ->
        - generate certificate
        - generate nginx server block file
        - restart nginx

  TODO: show error when insert fails (when meilisearch is down for example)



  Future:
    - Custom css
    - Limit docs that a user can create (add to invitation) and/or amount of pages in total?
*/
