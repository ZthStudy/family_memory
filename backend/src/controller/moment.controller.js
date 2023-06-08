const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 获取数据
    const moment = ctx.request.body

    console.log({ moment })

    const data = await momentService.create(moment, ctx)

    ctx.body = {
      code: 1,
      data,
    }
  }

  async list(ctx, next) {
    const data = await momentService.query(ctx)

    ctx.body = {
      code: 1,
      data,
    }
  }

  async detail(ctx, next) {
    const data = await momentService.queryDetail(ctx)

    ctx.body = {
      code: 1,
      data: data[0],
    }
  }

  async update(ctx, next) {
    const data = await momentService.update(ctx)

    ctx.body = {
      code: 1,
      data: data,
    }
  }
}

module.exports = new MomentController()
