const connection = require('../database')

class MomentService {
  async create(moment, ctx) {
    const { content } = moment

    const { id } = ctx.user

    const statement = 'INSERT INTO `moment` (content,user_id) values(?,?)'
    const [res] = await connection.execute(statement, [content, id])
    return res
  }

  async query(ctx) {
    const { size = 10, offet = 0 } = ctx.query

    const statement = `
    SELECT
    moment.id id,
    moment.content content,
    moment.user_id user_id,
    moment.createdAt createdAt,
    moment.updatedAt updatedAt,
    JSON_OBJECT( 'name', user.name, 'id', user.id ) AS 'user' 
    FROM
    moment
    LEFT JOIN user ON moment.user_id = user.id 
    LIMIT ? OFFSET ?;
    `

    const [res] = await connection.execute(statement, [
      String(size),
      String(offet),
    ])
    console.log(res)
    return res
  }

  async queryDetail(ctx) {
    try {
      const { momentId } = ctx.params

      const statement = `
      SELECT
      moment.id id,
      moment.content content,
      moment.user_id user_id,
      moment.createdAt createdAt,
      moment.updatedAt updatedAt,
      JSON_OBJECT( 'name', USER.NAME, 'id', USER.id ) AS 'user' 
      FROM
        moment
        LEFT JOIN USER ON moment.user_id = USER.id 
      WHERE
        moment.id = ?;
      `

      const [res] = await connection.execute(statement, [momentId])
      return res
    } catch (error) {
      console.log({ error })
    }
  }

  async update(ctx) {
    try {
      const { momentId } = ctx.params

      const { content } = ctx.request.body

      const statement = `
        UPDATE moment SET moment.content = ? WHERE moment.id = ?;
      `

      const [res] = await connection.execute(statement, [content, momentId])
      return res
    } catch (error) {
      console.log({ error })
    }
  }
}

module.exports = new MomentService()
