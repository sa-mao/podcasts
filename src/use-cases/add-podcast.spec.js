import makeAddpodcast from './add-podcast'

describe('add podcast', () => {
  const fakepodcast = {
    url: 'h'
  }
  it('requires an url', () => {
    const acast = {}
    const podcastCache = {}
    const addPodcast = makeAddpodcast(acast, podcastCache)
    expect(addPodcast()).rejects.toThrow('podcast url is required.')
  })

  it('throws not found', async () => {
    const acast = {
      getPodcast: jest.fn(() => Promise.resolve(null))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(null))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache })
    expect(addPodcast({ url: fakepodcast.url })).rejects.toThrow('Podcast not found.')
  })

  it('inserts a podcast into cache', async () => {
    const acast = {
      getPodcast: jest.fn(() => Promise.resolve(fakepodcast))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(null)),
      insertPodcast: jest.fn((params) => Promise.resolve(params))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache })
    const cached = await addPodcast({ url: fakepodcast.url })
    expect(cached).toMatchObject(fakepodcast)
    expect(podcastCache.findByUrl.mock.calls.length).toBe(1)
    expect(acast.getPodcast.mock.calls.length).toBe(1)
    expect(podcastCache.insertPodcast.mock.calls.length).toBe(1)
  })

  it('does not add cached podcasts', async () => {
    const acast = {
      getPodcast: jest.fn(() => Promise.resolve(null))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(fakepodcast)),
      insertPodcast: jest.fn((params) => Promise.resolve(params))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache })
    const cached = await addPodcast({ url: fakepodcast.url })
    expect(cached).toMatchObject(fakepodcast)
    expect(podcastCache.findByUrl.mock.calls.length).toBe(1)
    expect(acast.getPodcast.mock.calls.length).toBe(0)
    expect(podcastCache.insertPodcast.mock.calls.length).toBe(0)
  })
})
