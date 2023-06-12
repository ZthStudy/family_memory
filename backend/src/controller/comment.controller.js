const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    try {
      const data = await commentService.create(ctx)

      ctx.body = {
        code: 1,
        data,
      }
    } catch (error) {
      console.log({ controller_error: error })
    }
  }
}

module.exports = new CommentController()
