import type { Middleware } from 'koa'
import type { ServerContext, ServerState } from './'
/**
 * We only allow a certain subset of the
 * available HTTP methods
 */
export type AllowedMethod =
  | 'get'
  | 'post'
  | 'patch'
  | 'put'
  | 'delete'
  | 'options'
  | 'head'

type Handler = Middleware<ServerState, ServerContext>

/**
 * A Route is a way to map an HTTP method
 * and some path to the execution of 1 or more
 * handlers
 */
export interface Route {
  method: AllowedMethod
  path: string
  handlers: Handler[]
}

/**
 * Creates a Get Route given the path and handler(s)
 */
export const GET = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'get',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Post Route given the path and handler(s)
 */
export const POST = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'post',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Patch Route given the path and handler(s)
 */
export const PATCH = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'patch',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Put Route given the path and handler(s)
 */
export const PUT = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'put',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Delete Route given the path and handler(s)
 */
export const DELETE = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'delete',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Options Route given the path and handler(s)
 */
export const OPTIONS = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'options',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})

/**
 * Creates a Head Route given the path and handler(s)
 */
export const HEAD = ({
  path,
  handlers,
}: {
  path: string
  handlers: Handler | Handler[]
}): Route => ({
  method: 'head',
  path,
  handlers: Array.isArray(handlers) ? handlers : [handlers],
})
