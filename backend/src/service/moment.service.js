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
    m.id id,
    m.content content,
    m.user_id user_id,
    m.createdAt createdAt,
    m.updatedAt updatedAt,
    JSON_OBJECT( 'name', USER.NAME, 'id', USER.id ) AS 'user' ,
    (SELECT COUNT(*)  FROM comment WHERE comment.moment_id = m.id) commentCount
  FROM
    moment m
    LEFT JOIN USER ON m.user_id = USER.id 
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
      m.id id,
      m.content content,
      m.user_id user_id,
      m.createdAt createdAt,
      m.updatedAt updatedAt,
      JSON_OBJECT( 'name', u.NAME, 'id', u.id ) AS 'user',
      (
      SELECT
        JSON_ARRAYAGG(JSON_OBJECT( 'id', file.id, 'filename', file.filename, 'userId', file.user_id, 'momentId', file.moment_id )) 
      FROM
        file
      WHERE
        file.moment_id = ?
      ) files,
      (
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id',
            cm.id,
            'content',
            cm.content,
            'comment_id',
            cm.comment_id,
            'user',
          JSON_OBJECT( 'name', cu.NAME, 'id', cu.id )))) comments 
    FROM
      moment m
      LEFT JOIN USER u ON m.user_id = u.id
      LEFT JOIN COMMENT cm ON cm.moment_id = m.id
      LEFT JOIN USER cu ON cu.id = cm.user_id 
    WHERE
      m.id = ?
      GROUP BY
	    m.id;
      `

      const [res] = await connection.execute(statement, [momentId,momentId])
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

  async delete(ctx) {
    try {
      const { momentId } = ctx.params

      const statement = `
      DELETE FROM moment WHERE moment.id = ?;
      `

      const [res] = await connection.execute(statement, [momentId])
      return res
    } catch (error) {
      console.log({ error })
    }
  }
}

module.exports = new MomentService()
