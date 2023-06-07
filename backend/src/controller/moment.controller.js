const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 获取数据
    const moment = ctx.request.body

    console.log({ moment })

    const data = await momentService.create(moment, ctx)

    ctx.body = {
      data,
    }
  }
}

module.exports = new MomentController()
