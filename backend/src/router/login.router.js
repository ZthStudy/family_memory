const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const { verifyLogin, verifyToken } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

// 注册用户
loginRouter.post('/', verifyLogin, loginController.sign)

// 效验token
loginRouter.get('/test', verifyToken, loginController.test)

module.exports = loginRouter
