//import conf from '../src/conf'
import acast from '../src/acast'
import varvetPodcast from './data/acast/varvet.json'

describe('Acast', () => {
  it('returns null when podcast is not found', async () => {
    const nonExisitingPodcastUrl = 'https://rss.acast.com/varve'
    const result = await acast.get(nonExisitingPodcastUrl)
    expect(result).toBeNull()
  })

  it('returns a podcast entity', async () => {
    jest.setTimeout(40000)
    const existingPodcastUrl = 'https://rss.acast.com/varvet'
    const result = await acast.get(existingPodcastUrl)
    expect(result.toJson()).toMatchObject(varvetPodcast)
  })
})
