const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const filename = args[0]

const replaceContent = (content, moduleName) => {
  const firstUpperModuleName =
    `${moduleName}`.charAt(0).toUpperCase() + `${moduleName}`.slice(1)
  return content
    .replace(/templateService/g, `${firstUpperModuleName}Service`)
    .replace(/templateController/g, `${firstUpperModuleName}Controller`)
    .replace(/template/g, `${moduleName}`)
}

if (filename) {
  // 自动写入文件目录  生成 router controller middleware service文件

  ;['router', 'controller', 'middleware', 'service'].forEach((folder) => {
    const write_path = `./${folder}/${filename}`
    // 不存在文件
    if (!fs.existsSync(path.resolve(__dirname, write_path))) {
      const tem = fs.readFileSync(
        path.resolve(__dirname, `../template/${folder}.js`),
        {
          encoding: 'utf8',
        }
      )

      const write_content = replaceContent(tem, filename)

      // 创建文件
      fs.writeFileSync(`./src/${folder}/${filename}.${folder}.js`, write_content)
    }
  })
}
