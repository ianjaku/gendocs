import inquirer from "inquirer"

function promptCredentials(): Promise<{email: string, password: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "email",
        message: "Email: ",
        validate(value: string) {
          if (value != null && value.match(/@/)) {
            return true
          }
          return "Must be a valid email."
        }
      },
      {
        type: "password",
        name: "password",
        message: "Password: ",
        validate(value: string) {
          if (value != null && value.length > 7) {
            return true
          }
          return "Password must be at least 8 characters long"
        }
      }
    ])
}

function promptCreateDocument(): Promise<{name: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Document name: "
      }
    ])
}

export default {
  promptCredentials,
  promptCreateDocument
}
