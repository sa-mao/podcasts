import makePodcast from '../podcast'
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
      get: jest.fn(() => Promise.resolve(null))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(null))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache, makePodcast })
    expect(addPodcast({ url: fakepodcast.url })).rejects.toThrow('Podcast not found.')
  })

  it('inserts a podcast into cache', async () => {
    const acast = {
      get: jest.fn(() => Promise.resolve(makePodcast(fakepodcast)))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(null)),
      insert: jest.fn((url, podcast) => Promise.resolve(podcast))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache })
    const cached = await addPodcast({ url: fakepodcast.url })
    expect(cached).toMatchObject(fakepodcast)
    expect(podcastCache.findByUrl.mock.calls.length).toBe(1)
    expect(acast.get.mock.calls.length).toBe(1)
    expect(podcastCache.insert.mock.calls.length).toBe(1)
  })

  it('does not add cached podcasts', async () => {
    const acast = {
      get: jest.fn(() => Promise.resolve(null))
    }

    const podcastCache = {
      findByUrl: jest.fn(() => Promise.resolve(makePodcast(fakepodcast))),
      insert: jest.fn((params) => Promise.resolve(params))
    }

    const addPodcast = makeAddpodcast({ acast, cache: podcastCache, makePodcast })
    const cached = await addPodcast({ url: fakepodcast.url })
    expect(cached.toJson()).toMatchObject(fakepodcast)
    expect(podcastCache.findByUrl.mock.calls.length).toBe(1)
    expect(acast.get.mock.calls.length).toBe(0)
    expect(podcastCache.insert.mock.calls.length).toBe(0)
  })
})
