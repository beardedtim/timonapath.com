import Koa, { Middleware } from 'koa'
import Router from '@koa/router'
import Log from '@app/shared/log'
import * as CONSTS from '@app/CONST'

import * as ServerMiddleware from './middleware'
export * as Route from './route'
import type { Server as HTTPServerInstance } from 'http'
import type { Route } from './route'

class Server {
  #app: Koa
  #router: Router
  #instance?: HTTPServerInstance

  constructor() {
    this.#app = new Koa()
    this.#router = new Router()
  }

  withViewContext() {
    this.#app.use((ctx, next) => {
      ctx.state.links = {
        head: new Set(),
        foot: new Set(),
        style: new Set(),
      }

      return next()
    })

    // using `function()` instead of `() => ` in order to get the
    // correct "this" value inside of it. We want `this` to be the
    // `ctx` value inside of the middleware/handler function
    this.#app.context.registerHeadScript = function (link: {
      src: string
      crossorigin?: string
    }) {
      this.state.links.head.add(link)
    }

    this.#app.context.registerFootScript = function (link: {
      src: string
      crossorigin?: string
    }) {
      this.state.links.foot.add(link)
    }

    this.#app.context.registerStyle = function (link: string) {
      this.state.links.style.add(link)
    }

    /**
     * Render gets given a string and some metadata
     * and will render the given string as the body
     * of the page and attach any registered styles/links
     */
    this.#app.context.render = function (
      str: string,
      meta: {
        title: string
        [x: string]: string
      },
    ) {
      this.status = 200
      this.set('Content-Type', 'text/html')

      const styles = [...this.state.links.style.values()]
      const headLinks = [...this.state.links.head.values()]
      const footLinks = [...this.state.links.foot.values()]
      console.log(styles, headLinks, footLinks)
      this.body = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="manifest" href="/assets/images/site.webmanifest">
    ${styles.map((href) => `<link rel="stylesheet" href="${href}" />`).join('\n')}
    ${headLinks
      .map(
        ({ src, crossorigin }) =>
          `<script src="${src}" ${
            crossorigin ? `crossorigin="${crossorigin}"` : ''
          }></script>`,
      )
      .join('\n')}
</head>
<body>
    ${str}
</body>
</html>
    ${footLinks
      .map(
        ({ src, crossorigin }) =>
          `<script src="${src}" ${
            crossorigin ? `crossorigin="${crossorigin}"` : ''
          }></script>`,
      )
      .join('\n')}
      `.trim()
    }

    return this
  }

  withGeneralMiddleware() {
    return this.use(
      ServerMiddleware.RequestId(),
      ServerMiddleware.RequestLogger({
        logger: Log.child({
          name: 'Server',
        }) as any,
      }),
      ServerMiddleware.ErrorHandling(),
      ServerMiddleware.BodyParser(),
      ServerMiddleware.CORS(),
      ServerMiddleware.SecurityHeaders(),
      ServerMiddleware.Static(CONSTS.PUBLIC_DIR),
      ServerMiddleware.GlobalAssets(),
    )
  }

  withAuthedRoutePrefix(
    routePrefix: string,
    { name, pass }: { name: string; pass: string },
  ) {
    // Attach to all routes with the given prefix the BasicAuth
    // schema
    this.#router.use(routePrefix, ServerMiddleware.BasicAuth({ name, pass }))

    return this
  }

  use(...handlers: Middleware[]) {
    for (const handler of handlers) {
      this.#app.use(handler)
    }

    return this
  }

  route(routeConfig: Route) {
    this.#router[routeConfig.method](routeConfig.path, ...routeConfig.handlers)

    return this
  }

  routes(...routes: Route[]) {
    for (const route of routes) {
      this.route(route)
    }

    return this
  }

  start(port: number) {
    return new Promise((res) => {
      this.#instance = this.#app
        .use(this.#router.routes())
        .use(this.#router.allowedMethods())
        .listen(port, () => res(void 0))
    })
  }

  stop() {
    return new Promise((res) => {
      if (this.#instance) {
        this.#instance.close(() => {
          this.#instance = undefined

          res(void 0)
        })
      } else {
        res(void 0)
      }
    })
  }
}

export default Server
