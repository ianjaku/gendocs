
const _messages: {[command: string]: () => string} = {
  help() {
    return `
      Available commands:
        - help 
    `
  },
  register() {
    return `
      Registers a new user, prompts for the required data.
    `
  }
}

export default _messages