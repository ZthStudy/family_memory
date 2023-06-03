const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { handlePassword, verifyUser } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/users' })

// 注册用户
userRouter.post('/', verifyUser, handlePassword, userController.create)

module.exports = userRouter
