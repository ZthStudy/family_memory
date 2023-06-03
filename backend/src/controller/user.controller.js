const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 获取数据
    const user = ctx.request.body

    //  数据库操作创建用户
    const data = await userService.create(user)

    ctx.body = {
      data,
    }
  }
}

module.exports = new UserController()
