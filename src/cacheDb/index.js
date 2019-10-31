import redis from 'redis'
import { promisify } from 'util'
import makeCacheDb from './cacheDb'
import makePodcast from '../podcast'
import logger from '../logger'

const client = redis.createClient({
  host: global.podcastConf.redisHost,
  port: global.podcastConf.redisPort
})

client.on('error', function (err) {
  if (err.code === 'ECONNREFUSED') {
    client.end()
  }
  logger.debug(err)
})
logger.info(`Connect to redis host ${global.podcastConf.redisHost} on port ${global.podcastConf.redisPort}`)
const redisClient = Object.freeze({
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  flushall: promisify(client.flushall).bind(client),
  ttl: global.podcastConf.redisKeysttl
})

const cacheDb = makeCacheDb({
  client: redisClient,
  makePodcast,
  logger: logger
})

export default cacheDb
