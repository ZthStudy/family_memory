const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { handlePassword, verifyUser } = require('../middleware/user.middleware')
const momentController = require('../controller/moment.controller')

const { fork } = require('child_process')
const path = require('path')
const cluster = require('cluster')

const userRouter = new KoaRouter({ prefix: '/users' })

// 注册用户
userRouter.post('/', verifyUser, handlePassword, userController.create)

// cpu计算延迟 test

userRouter.get(
  '/',
  async (ctx, next) => {
    const child = fork(path.resolve(__dirname, '../script/testCalc.js'))

    child.send({ data: 11 })

    child.on('message', (message) => {
      console.log('计算完成:' + message.data)

      ctx.yyy = 1

      child.kill()
    })

    child.on('exit', () => {
      console.log('process exit')
    })

    await next()
  },
  async (ctx) => {
    ctx.body = 1
  }
)

// 集群进程
userRouter.get(
  '/test',
  async (ctx, next) => {
    if (cluster.isPrimary) {
      const worker = cluster.fork() // 启动子进程
      // 发送任务数据给执行进程，并监听子进程回传的消息
      worker.send({ num: 2 })
      worker.on('message', (message) => {
        console.log(
          `receive fib(${message.num}) calculate result ${message.num}`
        )
        worker.kill()
      })

      // 监听子进程退出的消息，直到子进程全部退出
      cluster.on('exit', (worker) => {
        console.log('worker ' + worker.process.pid + ' killed!')
        if (Object.keys(cluster.workers).length === 0) {
          console.log('calculate main process end')
        }
      })

      await next()
    } else {
      // 子进程执行逻辑
      process.on('message', (message) => {
        // 监听主进程发送的信息
        const { num } = message
        console.log('child pid', process.pid, 'receive num', num)
        for (let i = 0; i < 30000; i++) {
          console.log({ i })
        }
        process.send({ num }) // 将计算结果发送给主进程
      })
    }
  },
  (ctx) => {
    ctx.body = 2
  }
)

module.exports = userRouter
