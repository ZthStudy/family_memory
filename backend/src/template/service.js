const connection = require('../database')

class templateService {
  async create(template) {
    const { field1, field2 } = template

    const statement = 'INSERT INTO `template` (field1,field2) values(?,?)'
    const [res] = await connection.execute(statement, [field1, field2])
    return res
  }

  async query(value) {
    const statement = 'SELECT * FROM `template` WHERE name = ?;'

    const [res] = await connection.execute(statement, [value])
    console.log(res)
    return res
  }
}

module.exports = new templateService()
