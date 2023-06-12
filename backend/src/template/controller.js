const templateService = require('../service/template.service')

class templateController {
  async create(ctx, next) {
    try {
      // 获取数据
      const template = ctx.request.body

      const data = await templateService.create(template)

      ctx.body = {
        code: 1,
        data,
      }
    } catch (error) {
      console.log({ controller_error: error })
    }
  }
}

module.exports = new templateController()
