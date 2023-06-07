const connection = require('../database')

class MomentService {
  async create(moment, ctx) {
    const { content } = moment

    const { id } = ctx.user

    const statement = 'INSERT INTO `moment` (content,user_id) values(?,?)'
    const [res] = await connection.execute(statement, [content, id])
    return res
  }

  async query(value) {
    const statement = 'SELECT * FROM `moment` WHERE name = ?;'

    const [res] = await connection.execute(statement, [value])
    console.log(res)
    return res
  }
}

module.exports = new MomentService()
