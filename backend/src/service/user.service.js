const connection = require('../database')

class UserService {
  async create(user) {
    const { name, password } = user

    const statement = 'INSERT INTO `user` (name,password) values(?,?)'
    const [res] = await connection.execute(statement, [name, password])
    return res
  }

  async queryByName(value) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'

    const [res] = await connection.execute(statement, [value])
    console.log(res)
    return res
  }
}

module.exports = new UserService()
