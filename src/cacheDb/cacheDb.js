import makePodcast from '../podcast'
export default function makeCacheDb ({
  client,
  logger
}) {
  /**
   * retrieve a podcast from cache.
   *
   * @param {string} url
   * @returns {Podcast} podcast instance.
   */
  async function findByUrl (url) {
    try {
      const res = await client.get(url)
      const podcast = JSON.parse(res)
      if (!podcast) {
        return null
      }
      return makePodcast(JSON.parse(res))
    } catch (e) {
      logger.debug(e)
      logger.error(e.message)
      return null
    }
  }

  /**
   * Insert a podcast into cache.
   *
   * @param {string} url
   * @param {object} obj
   * @returns {Podcast} podcast instance
   */
  async function insert (url, obj) {
    try {
      const res = await client.set(url, JSON.stringify(obj))
      if (res !== 'OK') {
        logger.error(`insert operation failed with status ${res}`)
        return null
      }
      const saved = await findByUrl(url)
      return saved
    } catch (e) {
      logger.debug(e)
      logger.error(e.message)
      return null
    }
  }

  return Object.freeze({
    findByUrl: findByUrl,
    insert: insert,
    flushDb: client.flushall
  })
}
