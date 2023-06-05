const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const filename = args[0]

if (filename) {
  // 自动写入文件目录  生成 router controller middleware service文件

  ;['router', 'controller', 'middleware', 'service'].forEach((folder) => {
    const write_path = `./${folder}/${filename}`
    // 不存在文件
    if (!fs.existsSync(path.resolve(__dirname, write_path))) {
      // 创建文件
      fs.writeFile(`./src/${folder}/${filename}.${folder}.js`, '', (err) => {
        if (err) {
          console.log('文件写入错误', err)
        }
      })
    }
  })
}
