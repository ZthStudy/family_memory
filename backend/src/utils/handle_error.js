const app = require('../app')
const {
  NAME_OR_PASSWORD_NOT_NULL,
  NAME_EXISTS,
  NAME_NOT_EXISTS,
  INVALID_TOKEN,
} = require('../config/err_contants')
app.on('error', (error, ctx) => {
  // console.log({ error })

  let code = 1000
  let message = ''
  switch (error) {
    case NAME_OR_PASSWORD_NOT_NULL:
      code = -1101
      message = '用户名和密码不能为空'
      break
    case NAME_EXISTS:
      code = -1102
      message = '用户名已存在'
      break

    case NAME_NOT_EXISTS:
      code = -1103
      message = '用户名不存在'
      break

    case INVALID_TOKEN:
      code = -1104
      message = '无效的token'
      break
    default:
      break
  }

  ctx.body = {
    code,
    message,
  }
})
