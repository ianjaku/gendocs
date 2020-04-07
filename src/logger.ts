
function info(msg: string) {
  console.log(msg)
}

function error(msg: string, context?: any) {
  console.error("[GENDOCS ERROR] ", msg, context)
}

export default {
  info,
  error
}