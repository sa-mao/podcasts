import {
  makeAcast,
  buildGetPodcastCommand
} from './acast'

describe('Acast', () => {
  it('requires a podcast url', () => {
    const acast = makeAcast({
      issueHttpRequest: {},
      pipe: jest.fn(() => {})
    })
    expect(acast.get()).rejects.toThrow('podcast url is required')
    expect(acast.get('')).rejects.toThrow('podcast url is required')
  })

  it('should build a valid acast request', async () => {
    const podcastUrl = 'https://rss.acast.com/varvet'
    const expected = {
      method: 'get',
      url: podcastUrl
    }
    expect(buildGetPodcastCommand(podcastUrl)).toMatchObject(expected)
  })

  xit('should return a valid podcast entity', () => {})
  xit('should handle no response', async () => {})
  xit('return 500 on everything else', async () => {})
})
