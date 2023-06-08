const template = async (ctx, next) => {
  try {
    const template = ctx.request.body

    await next()
  } catch (error) {
    console.log({ middleware_error: error })
  }
}

module.exports = { template }
