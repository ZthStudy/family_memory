const KoaRouter = require('@koa/router')
const templateController = require('../controller/template.controller')
const { verifyToken } = require('../middleware/login.middleware')

const templateRouter = new KoaRouter({ prefix: '/template' })

templateRouter.post('/', verifyToken, templateController)

templateRouter.get('/', verifyToken, templateController)

module.exports = templateRouter
