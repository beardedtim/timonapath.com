import getenv from 'getenv'

import Log from '@app/shared/log'
import Server from '@app/server'
import * as Routes from '@app/routes'

const routes = [
  ...Routes.publicRoutes,
  ...Routes.adminRoutes,
  ...Routes.apiRoutes,
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
