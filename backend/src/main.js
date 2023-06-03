const { SERVER_PORT } = require('./config/server')

const app = require('./app')

require('./utils/handle_error')

app.listen(SERVER_PORT, () => {
  console.log('familyMemory服务已启动')
})
