// 修改当前动态的创建人应为登录人

const { NO_PERSSION } = require('../config/err_contants')
const permissionService = require('../service/permission.service')

const verifyMomentPermission = async (ctx, next) => {
  try {
    const { momentId } = ctx.params

    const { id } = ctx.user

    const hasPermission = await permissionService.moment(momentId, id)

    if (!hasPermission) {
      return ctx.app.emit('error', NO_PERSSION, ctx)
    }

    await next()
  } catch (error) {
    console.log({ middleware_error: error })
  }
}

module.exports = { verifyMomentPermission }
