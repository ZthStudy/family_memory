const connection = require('../database')

class templateService {
  async create(template) {
    try {
      const { field1, field2 } = template

      const statement = 'INSERT INTO `template` (field1,field2) values(?,?)'
      const [res] = await connection.execute(statement, [field1, field2])
      return res
    } catch (error) {
      console.log({ service_error: error })
    }
  }

  async query(value) {
    try {
      const statement = 'SELECT * FROM `template` WHERE name = ?;'

      const [res] = await connection.execute(statement, [value])
      return res
    } catch (error) {
      console.log({ service_error: error })
    }
  }
}

module.exports = new templateService()
