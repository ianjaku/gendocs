
function info(msg: string) {
  console.log(msg)
}

function error(msg: string, context?: any) {
  if (context == null) {
    console.error("[GENDOCS ERROR] ", msg)
  } else {
    console.error("[GENDOCS ERROR] ", msg, context)
  }
}

export default {
  info,
  error
}