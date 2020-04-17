import crypto from "crypto"

function checksumForString(contentJson: string) {
  return crypto.createHash("md5").update(contentJson).digest("hex")
}

export default {
  checksumForString
}
