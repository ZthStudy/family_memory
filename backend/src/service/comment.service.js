const connection = require('../database')

class CommentService {
  async create(ctx) {
    try {
      const { content, momentId } = ctx.request.body

      const { id } = ctx.user

      const statement =
        'INSERT INTO `comment` (content,moment_id,user_id) values(?,?,?)'
      const [res] = await connection.execute(statement, [content, momentId, id])
      return res
    } catch (error) {
      console.log({ service_error: error })
    }
  }

  async query(value) {
    try {
      const statement = 'SELECT * FROM `comment` WHERE name = ?;'

      const [res] = await connection.execute(statement, [value])
      return res
    } catch (error) {
      console.log({ service_error: error })
    }
  }
}

module.exports = new CommentService()
