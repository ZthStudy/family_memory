// 修改当前动态的创建人应为登录人

const { NO_PERSSION } = require('../config/err_contants')
const permissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  try {
    const { id } = ctx.user

    // 动态路径参数
    const key = Object.keys(ctx.params)[0]

    const resourceName = key.replace('Id', '')

    const resourceId = ctx.params[key]

    const hasPermission = await permissionService.verify(
      resourceName,
      resourceId,
      id
    )

    if (!hasPermission) {
      return ctx.app.emit('error', NO_PERSSION, ctx)
    }

    await next()
  } catch (error) {
    console.log({ middleware_error: error })
  }
}

module.exports = { verifyPermission }
