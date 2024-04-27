import getenv from 'getenv'

import Log from '@app/shared/log'
import Server, { Route } from '@app/server'
import * as Pages from '@app/view/pages'

import * as Thoughts from '@app/domains/thoughts'

const routes = [
  Route.GET({
    path: '/.well-known/healthcheck',
    handlers: (ctx) => {
      ctx.status = 200
      ctx.body = {
        data: {
          healthy: true,
        },
      }
    },
  }),
  Route.GET({
    path: '/',
    handlers: (ctx) => {
      ctx.registerStyle('/assets/css/home.css')

      const meta = {
        title: 'Tim on a Path',
      }

      ctx.render(Pages.HomePage(), meta)
    },
  }),
  Route.GET({
    path: '/admin/thoughts/create',
    handlers: (ctx) => {
      ctx
        .registerHeadScript({
          src: 'https://cdn.tiny.cloud/1/9gwptj7qlzokszivkumi1duezsyjy0wp3c3u5zb772libeo7/tinymce/7/tinymce.min.js',
          referrerpolicy: 'origin',
        })
        .registerHeadScript({
          src: 'https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/bulma-quickview/dist/js/bulma-quickview.min.js',
        })
        .registerStyle(
          'https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/dist/css/bulma-extensions.min.css',
        )
        .registerFootScript({
          src: '/assets/js/editor.js',
        })
        .render(Pages.CreateThought(), {
          title: 'Create | Tim on a Path',
        })
    },
  }),
  Route.POST({
    path: '/api/thoughts',
    handlers: async (ctx) => {
      const result = await Thoughts.createThought(
        Thoughts.CreateThoughtSchema.parse(ctx.request.body),
      )

      ctx.status = 201

      ctx.body = {
        data: result,
      }
    },
  }),
  Route.GET({
    path: '/api/thoughts/:id',
    handlers: async (ctx) => {
      const result = await Thoughts.getById(ctx.params.id)

      ctx.status = 200

      ctx.body = {
        data: result,
      }
    },
  }),
  Route.PATCH({
    path: '/api/thoughts/:id',
    handlers: async (ctx) => {
      const result = await Thoughts.updateThoughtById(
        ctx.params.id,
        ctx.request.body,
      )

      ctx.status = 200

      ctx.body = {
        data: result,
      }
    },
  }),
]

const main = async () => {
  Log.trace('Starting system')

  const server = new Server()

  server
    .withViewContext()
    .withGeneralMiddleware()
    .withAuthedRoutePrefix('/admin', {
      name: getenv.string('ADMIN_USER'),
      pass: getenv.string('ADMIN_PASS'),
    })
    .routes(...routes)

  const port = getenv.int('PORT')

  await server.start(port)

  Log.trace({ port }, 'System started')
}

main()
