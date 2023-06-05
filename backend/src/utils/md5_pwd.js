const crypto = require('crypto')

const md5Pwd = (password) => {
  const md5 = crypto.createHash('md5')
  console.log({ md5 })

  const md5Password = md5.update(password + '').digest('hex')
  // console.log({ md5Password })

  return md5Password
}

module.exports = md5Pwd
