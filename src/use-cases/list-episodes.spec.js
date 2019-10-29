import makeListEpisodes from './list-episodes'

describe('list episodes', () => {
  const fakepodcast = {
    id: 'bf4e5114-fe02-4088-9a07-c1b81a3c615a',
    item: [
      {
        title: 'KORT VERSION - #387: Björn Dixgård',
        link: 'https://play.acast.com/s/varvet/kortversion--387-bjorndixgard',
        checksum: 'randomchecksum1'
      },
      {
        title: '#387: Björn Dixgård',
        link: 'https://play.acast.com/s/varvet/-387-bjorndixgard',
        checksum: 'randomchecksum1'
      }
    ]
  }
  let podcastCache, listEpisodes
  beforeAll(() => {
    podcastCache = {
      findById: jest.fn(() => Promise.resolve(fakepodcast))
    }
    listEpisodes = makeListEpisodes({ cache: podcastCache })
  })
  it('requires a podcast id', () => {
    expect(listEpisodes()).rejects.toThrow('podcast Id is required.')
  })
  it('returns all episodes', async () => {
    const episodes = await listEpisodes({ podcastId: fakepodcast.id })

    expect(episodes.length).toBe(2)
    for (let i = 0; i < episodes.length; i++) {
      expect(episodes[i].checksum).toEqual(fakepodcast.item[i].checksum)
      expect(episodes[i].title).toEqual(fakepodcast.item[i].title)
      expect(episodes[i].url).toEqual(fakepodcast.item[i].link)
    }
  })
})
