const {
  NAME_OR_PASSWORD_NOT_NULL,
  NAME_EXISTS,
} = require('../config/err_contants')
const userService = require('../service/user.service')
const md5Pwd = require('../utils/md5_pwd')

const verifyUser = async (ctx, next) => {
  // 1. 是否非法
  const { name, password } = ctx.request.body

  // 1.1 用户名和密码不能为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_NOT_NULL, ctx)
  }

  // 1.2判断用户是否存在
  // console.log(user)
  const existUserList = await userService.queryByName(name)

  if (existUserList.length) {
    return ctx.app.emit('error', NAME_EXISTS, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = md5Pwd(password)

  await next()
}

module.exports = { verifyUser, handlePassword }
