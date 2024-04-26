import Pino from 'pino'

export default Pino({
  level: process.env.LOG_LEVEL || 'trace',
  name: process.env.SERVICE_NAME || 'UNKNOWN',
  serializers: Pino.stdSerializers,
})
