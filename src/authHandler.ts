import configHandler from "./configHandler";
import cli from "./cli";


async function getToken(args: string[] = []) {
  const configToken = await attemptGetTokenFromConfig()
  if (configToken != null) return configToken
  
  const tokenFileToken = await attemptGetTokenFromTokenFile()
  if (tokenFileToken != null) return tokenFileToken

  if (args.length > 0) {
    return args[0]
  }

  return await cli.promptToken()
}

async function attemptGetTokenFromTokenFile() {
  try {
    return await configHandler.readTokenFile()
  } catch (e) {
    return null
  }
}

async function attemptGetTokenFromConfig() {
  try {
    let config = await configHandler.readConfigFile()
    if (config == null) return null
    return config.token
  } catch (e) {
    return null
  }
}

export default {
  getToken
}