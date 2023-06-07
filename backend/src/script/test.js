const fs = require('fs')
const path = require('path')

const tem = fs.readFileSync(path.resolve(__dirname, '../template/service.js'), {
  encoding: 'utf8',
})

const handle = tem
  .replace(/templateService/g, `TestService`)
  .replace(/templateController/g, 'TestController')
  .replace(/template/g, 'test')

console.log({ handle })

fs.writeFileSync(path.resolve(__dirname, './test111.js'), handle, {
  encoding: 'utf8',
})
