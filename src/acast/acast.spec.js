import {
  makeAcast,
  buildFeederUrl,
  buildGetPodcastCommand
} from './acast'

describe('Acast', () => {
  it('requires a podcast url', async () => {
    const acast = makeAcast({
      issueHttpRequest: {},
      pipe: jest.fn(() => {}),
      conf: {
        acastRegexp: /^https:\/\/rss\.acast\.com\/([^/]+)\/?.*$/
      }
    })
    expect(acast.get()).rejects.toThrow('podcast url is required')
    expect(acast.get('')).rejects.toThrow('podcast url is required')
    const url = 'https://podcasts.files.bbci.co.uk/w13xttx2.rss'
    expect(acast.get(url)).rejects.toThrow(`Podcast url: '${url}' is not a valid Acast url`)
    // expect(acast.get('https://rss.acast.com/varvet')).rejects.toThrow()
  })

  it('should build a valid feeder url', () => {
    const show = 'varvet'
    const expected = 'https://feeder.acast.com/api/v1/shows/varvet'

    const conf = {
      acastFeederBaseUrl: 'https://feeder.acast.com/api/v1/shows/'
    }

    expect(buildFeederUrl(show, conf)).toEqual(expected)
  })

  it('should build a valid acast request', () => {
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
