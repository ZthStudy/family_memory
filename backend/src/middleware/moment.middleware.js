const moment = async (ctx, next) => {
  const moment = ctx.request.body

  await next()
}

module.exports = { moment }
