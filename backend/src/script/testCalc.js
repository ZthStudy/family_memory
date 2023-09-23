function calc() {
  for (let i = 0; i < 30000; i++) {
    console.log({ i })
  }
}

process.on('message', (msg) => {
  console.log(`child process pid ${process.pid}`)

  calc()

  process.send({ data: 9 })
})

process.on('SIGHUP', () => {
  process.exit()
})
