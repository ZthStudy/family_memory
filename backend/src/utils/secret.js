const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../config/secret/private.key')
)

const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../config/secret/public.key')
)

module.exports = {
  privateKey,
  publicKey,
}
