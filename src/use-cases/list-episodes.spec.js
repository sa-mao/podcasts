import makeListEpisodes from './list-episodes'

describe('list episodes', () => {
  const fakePodcast = {
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
  let podCastCache, listEpisodes
  beforeAll(() => {
    podCastCache = {
      findById: jest.fn(() => Promise.resolve(fakePodcast))
    }
    listEpisodes = makeListEpisodes({ cache: podCastCache })
  })
  it('requires a podcast id', () => {
    expect(listEpisodes()).rejects.toThrow('Podcast Id is required.')
  })
  it('returns all episodes', async () => {
    const episodes = await listEpisodes({ podCastId: fakePodcast.id })

    expect(episodes.length).toBe(2)
    for (let i = 0; i < episodes.length; i++) {
      expect(episodes[i].checksum).toEqual(fakePodcast.item[i].checksum)
      expect(episodes[i].title).toEqual(fakePodcast.item[i].title)
      expect(episodes[i].url).toEqual(fakePodcast.item[i].link)
    }
  })
})
