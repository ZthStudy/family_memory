const KoaRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { verifyToken } = require('../middleware/login.middleware')
const { handleFile } = require('../middleware/file.middleware')

const fileRouter = new KoaRouter({ prefix: '/file' })

// 上传资源
fileRouter.post(
  '/upload/:momentId',
  verifyToken,
  handleFile,
  fileController.upload
)

// 获取资源

fileRouter.get('/:id', fileController.readFile)

module.exports = fileRouter
