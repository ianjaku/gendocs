import inquirer from "inquirer"
import logger from "./logger"

function promptCredentials(): Promise<{email: string, password: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "email",
        message: "Email:",
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
        message: "Password:",
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
        message: "Document name:"
      }
    ])
}

function promptToken(): Promise<{token: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "token",
        message: "Token:"
      }
    ])
}

function promptConfirm(message: string): Promise<{result: boolean}> {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "result",
        message
      }
    ])
}

function promptDomain(): Promise<{domain: string}> {
  logger.info(`
    Which domain would you like to add?

    Format: example.com
  `)
  return inquirer
    .prompt([
      {
        type: "input",
        name: "result",
        message: "domain"
      }
    ])
}

function promptSubdomain(): Promise<{subdomain: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "subdomain",
        message: "New subdomain:",
        transformer(input: string, meta: any) {
          return input + ".gendocs.io"
        }
      }
    ])
}

function promptInvitation(): Promise<{invitation: string}> {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "invitation",
        message: "Your invitation:"
      }
    ])
}

export default {
  promptCredentials,
  promptCreateDocument,
  promptToken,
  promptConfirm,
  promptDomain,
  promptSubdomain,
  promptInvitation
}
