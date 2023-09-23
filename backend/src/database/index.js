const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'family-momery-mysql',
  // port: 3306,
  database: 'family_memory',
  user: 'root',
  password: 'zth@123456',
  connectionLimit: 5,
})

// 获取连接
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败', err)
  }

  // 尝试连接是否成功
  connection.connect((err) => {
    if (err) {
      console.log('数据库连接失败')
    } else {
      console.log('数据库连接成功')
    }
  })
})

// 获取连接池中的连接对象

const connection = connectionPool.promise()

module.exports = connection
