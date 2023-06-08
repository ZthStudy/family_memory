const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

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
  verifyPermission,
  momentController.update
)

// 删除动态

momentRouter.delete(
  '/:momentId',
  verifyToken,
  verifyPermission,
  momentController.delete
)

module.exports = momentRouter
