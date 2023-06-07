const template = async (ctx, next) => {
  const template = ctx.request.body

  await next()
}

module.exports = { template }
