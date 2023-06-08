const connection = require('../database')

class PermissionService {
  async moment(momentId, userId) {
    try {
      const statement = `
      SELECT * FROM moment WHERE moment.id = ? AND moment.user_id = ?;
    `
      const [res] = await connection.execute(statement, [momentId, userId])

      console.log({ res })

      return !!res[0]
    } catch (error) {
      console.log({ service_error: error })
    }
  }
}

module.exports = new PermissionService()
