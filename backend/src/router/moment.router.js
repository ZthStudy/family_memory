const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyToken, momentController.create)

module.exports = momentRouter
