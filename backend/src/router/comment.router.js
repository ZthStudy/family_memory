const KoaRouter = require('@koa/router')
const commentController = require('../controller/comment.controller')
const { verifyToken } = require('../middleware/login.middleware')

const commentRouter = new KoaRouter({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyToken, commentController.create)

// commentRouter.get('/', verifyToken, commentController)

module.exports = commentRouter
