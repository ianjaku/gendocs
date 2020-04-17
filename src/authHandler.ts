import configHandler from "./configHandler";
import cli from "./cli";

let _tokenCache: string | null = null

async function getToken(args: string[] = []) {
  if (_tokenCache != null) return _tokenCache
  
  const configToken = await attemptGetTokenFromConfig()
  if (configToken != null) return cacheToken(configToken)
  
  const tokenFileToken = await attemptGetTokenFromTokenFile()
  if (tokenFileToken != null) return cacheToken(tokenFileToken)

  if (args.length > 0) {
    return cacheToken(args[0])
  }

  return cacheToken(await cli.promptToken())
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

function cacheToken(token: string) {
  _tokenCache = token
  return token
}

export default {
  getToken
}