import inquirer from "inquirer"
import logger from "./logger"

async function promptPassword(): Promise<string> {
  const result = await inquirer
    .prompt([
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
  return result.password
}

async function promptEmail(): Promise<string> {
  const result = await  inquirer
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
    ])
  return result.email
}

function promptDocName(message: string = "Doc name:"): Promise<string> {
  return promptSingle(message)
}

function promptToken(): Promise<string> {
  return promptSingle("Token:")
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

function promptInvitation(): Promise<string> {
  return promptSingle("Your invitation:")
}

async function promptSingle(message: string): Promise<string> {
  const result = await inquirer
    .prompt([
      {
        type: "input",
        name: "value",
        message
      }
    ])

  return result.value
}

export default {
  promptEmail,
  promptPassword,
  promptDocName,
  promptToken,
  promptConfirm,
  promptDomain,
  promptSubdomain,
  promptInvitation
}
