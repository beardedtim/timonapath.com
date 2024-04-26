import getenv from 'getenv'

import Log from '@app/shared/log'
import Server, { Route } from '@app/server'
import { Components } from '@app/view/components'

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
      const meta = {
        title: 'Tim on a Path',
      }

      ctx.render(
        Components.Div(
          {
            id: 'main',
          },
          Components.H1(
            {
              class: 'is-size-1',
            },
            'Hello, world',
          ),
        ),
        meta,
      )
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
