import configHandler from "./configHandler";
import cli from "./cli";


async function getToken() {
  const token = await attemptGetTokenFromConfig()
  if (token != null) return token

  const cliResult = await cli.promptToken()
  return cliResult.token
}

async function attemptGetTokenFromConfig() {
  try {
    let {token} = await configHandler.readConfigFile()
    return token
  } catch (e) {
    return null
  }
}

export default {
  getToken
}