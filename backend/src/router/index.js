const fs = require('fs')

const registerRouter = (app) => {
  const files = fs.readdirSync(__dirname)

  // console.log({ files })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    if (file.endsWith('.router.js')) {
      const router = require(`./${file}`)

      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }
}

module.exports = { registerRouter }
