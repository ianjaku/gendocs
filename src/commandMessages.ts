
const _messages: {[command: string]: () => string} = {
  help() {
    return `
      Use gendocs help [command] to get more information about a command.
    
      Available commands:
        - help 
        - register
        - docs:create
        - docs:list
        - docs:remove
        - init
        - publish
        - subdomain:set
    `
  },
  register() {
    return `
      Registers a new user, prompts for the required data.
    `
  },
  "docs:create"() {
    return `
      Create a new project, prompts for the required data
    `
  },
  "docs:list"() {
    return `
      Lists all projects for the current user, prompts for the required data
    `
  },
  init() {
    return `
      Creates the gendocs.json file, prompts for the required data
    `
  },
  publish() {
    return `
      Commits your changes to your docs website.

      It's also possible to provide the token as a parameter, ex: gendocs publish [token]
    `
  },
  "subdomain:set"() {
    return `
      Change the subdomain for a project, promts for the required data.
    `
  },
  "docs:remove"() {
    return `
      Removes a doc, this action can not be undone!
    `
  }
}

export default _messages