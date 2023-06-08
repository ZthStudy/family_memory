const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const {
  verifyMomentPermission,
} = require('../middleware/permission.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyToken, momentController.create)

// 查询动态列表
momentRouter.get('/', momentController.list)

// 查询动态详情
momentRouter.get('/:momentId', momentController.detail)

// 修改动态
momentRouter.patch(
  '/:momentId',
  verifyToken,
  verifyMomentPermission,
  momentController.update
)

module.exports = momentRouter
