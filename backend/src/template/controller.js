const templateService = require('../service/template.service')

class templateController {
  async create(ctx, next) {
    // 获取数据
    const template = ctx.request.body

    const data = await templateService.create(template)

    ctx.body = {
      data,
    }
  }
}

module.exports = new templateController()
