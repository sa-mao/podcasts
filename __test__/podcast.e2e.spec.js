import '../src/conf'
import varvetPodcast from './data/acast/varvet.json'
import podcastController from '../src/controllers'
import cacheDb from '../src/cacheDb'

const headers = {
  'Content-Type': 'application/json'
}
describe('Podcast', () => {
  afterEach(async () => {
    await cacheDb.flushDb()
  })
  it('returns 404 when podcast is not found', async () => {
    const expected = {
      headers,
      statusCode: 404,
      body: {
        error: 'Podcast not found.'
      }
    }
    const request = {
      query: {
        podcastUrl: 'https://rss.acast.com/varve'
      }
    }
    const result = await podcastController.getEpisodes(request)
    expect(result).toMatchObject(expected)
  })

  it('returns a list of episdes', async () => {
    jest.setTimeout(40000)
    const expected = {
      headers,
      statusCode: 200,
      body: varvetPodcast.episodes
    }
    const request = {
      query: {
        podcastUrl: 'https://rss.acast.com/varvet'
      }
    }
    const result = await podcastController.getEpisodes(request)
    expect(result).toMatchObject(expected)
  })

  it('reads from cache', async () => {
    jest.setTimeout(40000)
    const url = 'https://rss.acast.com/varvet'
    const expected = {
      headers,
      statusCode: 200,
      body: varvetPodcast.episodes
    }
    const request = {
      query: {
        podcastUrl: url
      }
    }
    var result = await podcastController.getEpisodes(request)
    const firstPodCastId = (await cacheDb.findByUrl(url)).getPodcastId()

    result = await podcastController.getEpisodes(request)
    const secondPodCastId = (await cacheDb.findByUrl(url)).getPodcastId()
    expect(firstPodCastId).toEqual(secondPodCastId)
    expect(result).toMatchObject(expected)
  })
})
