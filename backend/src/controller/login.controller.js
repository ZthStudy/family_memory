const jwt = require('jsonwebtoken')
const { privateKey } = require('../utils/secret')

class LoginController {
  async sign(ctx, next) {
    // 获取数据
    const { name, id } = ctx.user

    // 颁发签名
    const token = jwt.sign({ name, id }, privateKey, {
      expiresIn: 24 * 60 * 60 * 3, // three day
      algorithm: 'RS256',
    })

    ctx.body = {
      name,
      id,
      token,
    }
  }

  async test(ctx) {
    ctx.body = 'token 有效'
  }
}

module.exports = new LoginController()
