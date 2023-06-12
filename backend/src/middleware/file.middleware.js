const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const upload = multer({
  dest: UPLOAD_PATH,
})

const handleFile = upload.array('files')

module.exports = { handleFile }
