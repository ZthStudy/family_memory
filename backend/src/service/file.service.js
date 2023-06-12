const connection = require('../database')

class FileService {
  async create(files, ctx) {
    const collectRes = []
    try {
      const { id } = ctx.user
      const { momentId } = ctx.params
      for (const file of files) {
        const { filename, mimetype, originalname, size } = file
        const statement = `
        INSERT INTO file ( filename, mimetype, originalname, size, user_id ,moment_id)
        VALUES
          (?,?,?,?,?,?);
        `
        const [res] = await connection.execute(statement, [
          filename,
          mimetype,
          originalname,
          size,
          id,
          momentId,
        ])

        collectRes.push(res)
      }

      return collectRes
    } catch (error) {
      console.log({ service_error: error })
    }
  }

  async queryById(id) {
    try {
      const statement = 'SELECT * FROM `file` WHERE id = ?;'

      const [res] = await connection.execute(statement, [id])
      return res[0]
    } catch (error) {
      console.log({ service_error: error })
    }
  }
}

module.exports = new FileService()
