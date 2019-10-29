import acast from '../src/acast'
import varvetPodcast from './data/acast/varvet-podcast.json'
const dummy = {
  'dqdq': 3
}
describe('Acast', () => {
  it('returns null when podcast is not found', async () => {
    const nonExisitingPodcastUrl = 'https://rss.acast.com/varve'
    const result = await acast.get(nonExisitingPodcastUrl)
    expect(result).toBeNull()
  })

  xit('returns a podcast entity', async () => {
    const exisitingPodcastUrl = 'https://rss.acast.com/varvet'
    const result = await acast.get(exisitingPodcastUrl)
    expect(result).toMatchObject(varvetPodcast)
  })
})
