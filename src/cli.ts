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
  return result.password.trim()
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
  return result.email.trim()
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

async function promptDomain(): Promise<string> {
  logger.info(`
    Which domain would you like to add?

    Format: example.com
  `)
  const result = await inquirer
    .prompt([
      {
        type: "input",
        name: "domain",
        message: "New custom domain:",
        transformer(input: string, meta: any) {
          return input
            .replace(/[^a-z0-9\.\-\_\~]/gi, "")
            .replace(/http(s)?/gi, "")
            .replace(/^www/gi, "")
        }
      }
    ])
  return result.domain.trim()
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

  return result.value.trim()
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
