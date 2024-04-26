import { Pool } from 'pg'
import Cursor from 'pg-cursor'
import getenv from 'getenv'
import Log from '@app/shared/log'

const DB = new Pool({
  host: getenv.string('DB_HOST'),
  port: getenv.int('DB_PORT'),
  password: getenv.string('DB_PASS'),
  user: getenv.string('DB_USER'),
  database: getenv.string('DB_NAME'),
})

export const query = DB.query.bind(DB)

export const getCursor = async (sql: string, values: unknown[]) => {
  const client = await DB.connect()

  return query(new Cursor(sql, values))
}

export const isHealthy = () =>
  query('SELECT NOW()')
    .then(() => true)
    .catch((err: any) => {
      Log.warn({ err }, 'Datastore connection not healthy')

      return false
    })
