
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
      Create a new document, prompt for the required data
    `
  },
  "document:list"() {
    return `
      Lists all documents for the current user, prompt for the required data
    `
  }
}

export default _messages