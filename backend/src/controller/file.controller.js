const { UPLOAD_PATH } = require('../config/path')
const fileService = require('../service/file.service')

const fs = require('fs')

class FileController {
  async upload(ctx, next) {
    try {
      const files = ctx.request.files

      console.log({ files })

      const data = await fileService.create(files, ctx)

      ctx.body = {
        code: 1,
        data,
      }
    } catch (error) {
      console.log({ controller_error: error })
    }
  }

  async readFile(ctx, next) {
    const { id } = ctx.params

    const { filename, mimetype } = await fileService.queryById(id)

    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new FileController()
