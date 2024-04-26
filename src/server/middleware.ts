import { randomUUID } from 'crypto'
import { Middleware } from 'koa'

export { default as CORS } from '@koa/cors'
export { default as SecurityHeaders } from 'koa-helmet'
export { default as BodyParser } from '@koa/bodyparser'
export { default as RequestLogger } from 'koa-pino-logger'
export { default as Static } from 'koa-static'
export { default as BasicAuth } from 'koa-basic-auth'

export const ErrorHandling = (): Middleware => async (ctx, next) => {
  try {
    await next()
  } catch (err: any) {
    ctx.log.warn({ err }, 'Unhandled Error during Request')

    const status = err.status || 500
    const msg = err.message || 'Internal Server Error'
    const originalBody = ctx.body

    // If it is a 401, we want to tell them how to authenticate
    if (status === 401) {
      ctx.set('WWW-Authenticate', 'Basic')
    }

    ctx.status = status
    ctx.body = {
      error: {
        message: msg,
      },
      meta: {
        originalBody,
      },
    }
  }
}

export const RequestId = (): Middleware => async (ctx, next) => {
  const reqId =
    ctx.headers['x-req-id'] ??
    `timonapath.com-${randomUUID({ disableEntropyCache: true })}-g`

  ctx.request.headers['x-req-id'] = reqId

  ctx.response.set('X-Req-Id', reqId)

  return next()
}

export const GlobalAssets = (): Middleware => (ctx, next) => {
  ctx.registerStyle('/assets/css/global.css')
  ctx.registerStyle(
    'https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css',
  )

  ctx.registerHeadScript({
    src: 'https://kit.fontawesome.com/4e53b202fd.js',
    crossorigin: 'anonymous',
  })

  return next()
}
