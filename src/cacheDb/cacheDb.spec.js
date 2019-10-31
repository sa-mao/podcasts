import makeCacheDb from './cacheDb'
import { makeFakePodcast } from '../../__test__/data/podcast'

describe('CacheDb', () => {
  let fakepodcast, cacheDb
  let cacheClient
  const logger = {
    error: jest.fn((msg) => {}),
    debug: jest.fn((msg) => {})
  }

  beforeAll(() => {
    fakepodcast = makeFakePodcast({})
    cacheClient = {
      get: jest.fn((url) => Promise.resolve(JSON.stringify(fakepodcast))),
      set: jest.fn((url, obj) => Promise.resolve('OK'))
    }
    cacheDb = makeCacheDb({
      client: cacheClient,
      logger
    })
  })

  describe('has findByUrl', () => {
    it('fetches a podcast by url', async () => {
      const returned = await cacheDb.findByUrl(fakepodcast.url)
      expect(returned.toJson()).toMatchObject(fakepodcast)
      expect(cacheClient.get).toBeCalledWith(fakepodcast.url)
    })

    it('returns null on error', async () => {
      const msg = 'Something happended'
      cacheClient.get = jest.fn((url) => Promise.reject(Error(msg)))
      cacheDb = makeCacheDb({
        client: cacheClient,
        logger
      })
      const returned = await cacheDb.findByUrl(fakepodcast.url)
      expect(returned).toBeNull()
      expect(logger.error).toBeCalledWith(msg)
    })
  })

  describe('has insert', () => {
    it('insert a podcast into db', async () => {
      cacheClient.get = jest.fn((url) => Promise.resolve(JSON.stringify(fakepodcast)))
      cacheDb = makeCacheDb({
        client: cacheClient,
        logger
      })
      const returned = await cacheDb.insert(fakepodcast.url, fakepodcast)
      expect(returned.toJson()).toMatchObject(fakepodcast)
      expect(cacheClient.get).toBeCalledWith(fakepodcast.url)
    })

    it('returns null when client set throws error', async () => {
      const msg = 'Something happened'
      cacheClient.set = jest.fn((url, obj) => Promise.reject(Error(msg)))
      cacheDb = makeCacheDb({
        client: cacheClient,
        logger
      })
      const returned = await cacheDb.insert(fakepodcast.url, fakepodcast)
      expect(returned).toBeNull()
      expect(logger.error).toBeCalledWith(msg)
    })

    it('returns null when client set throws error', async () => {
      const msg = 'insert operation failed with status KO'
      cacheClient.set = jest.fn((url, obj) => Promise.resolve('KO'))
      cacheDb = makeCacheDb({
        client: cacheClient,
        logger
      })
      const returned = await cacheDb.insert(fakepodcast.url, fakepodcast)
      expect(returned).toBeNull()
      expect(logger.error).toBeCalledWith(msg)
    })

    it('returns null when client fails to read', async () => {
      const msg = 'Something happened'
      cacheClient.set = jest.fn((url, obj) => Promise.resolve('OK'))
      cacheClient.get = jest.fn((url) => Promise.reject(Error(msg)))
      cacheDb = makeCacheDb({
        client: cacheClient,
        logger
      })
      const returned = await cacheDb.insert(fakepodcast.url, fakepodcast)
      expect(returned).toBeNull()
      expect(logger.error).toBeCalledWith(msg)
    })
  })
})
