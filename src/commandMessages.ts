
const _messages: {[command: string]: () => string} = {
  help() {
    return `
      Available commands:
        - help 
        - register
        - document:create
    `
  },
  register() {
    return `
      Registers a new user, prompts for the required data.
    `
  },
  "document:create"() {
    return `
      Create a new document, prompts for the required data
    `
  },
  "document:list"() {
    return `
      Lists all documents for the current user, prompts for the required data
    `
  },
  init() {
    return `
      Creates the gendocs.json file, prompts forn the required data
    `
  }
}

export default _messages