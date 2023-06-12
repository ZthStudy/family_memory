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
      data: data,
    }
  }

  async update(ctx, next) {
    const data = await momentService.update(ctx)

    ctx.body = {
      code: 1,
      data: data,
    }
  }

  async delete(ctx, next) {
    try {
      const data = await momentService.delete(ctx)

      console.log({ data })

      ctx.body = {
        code: 1,
        data,
      }
    } catch (error) {
      console.log({ controller_error: error })
    }
  }
}

module.exports = new MomentController()
