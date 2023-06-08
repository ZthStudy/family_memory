const connection = require('../database')

class PermissionService {
  async verify(resourceName, resourceId, userId) {
    try {
      const statement = `
      SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;
    `
      const [res] = await connection.execute(statement, [resourceId, userId])

      // console.log({ res })

      return !!res[0]
    } catch (error) {
      console.log({ service_error: error })
    }
  }
}

module.exports = new PermissionService()
