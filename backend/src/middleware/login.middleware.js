const {
  NAME_OR_PASSWORD_NOT_NULL,
  NAME_NOT_EXISTS,
  PASSWORD_INCORRECT,
} = require('../config/err_contants')
const userService = require('../service/user.service')
const md5Pwd = require('../utils/md5_pwd')

const verifyLogin = async (ctx, next) => {
  // 1. 是否非法
  const { name, password } = ctx.request.body

  // 1.1 用户名和密码不能为空
  if (!name || !password) {
    // console.log({ ddd: ctx.app.emit })

    return ctx.app.emit('error', NAME_OR_PASSWORD_NOT_NULL, ctx)
  }

  // 1.2 用户不存在
  // console.log(user)
  const [user] = await userService.queryByName(name)

  if (!user) {
    return ctx.app.emit('error', NAME_NOT_EXISTS, ctx)
  }

  // 1.3 效验密码是否正确

  if (user.password !== md5Pwd(password)) {
    return ctx.app.emit('error', PASSWORD_INCORRECT, ctx)
  }

  ctx.user = user
  await next()
}

module.exports = { verifyLogin }
