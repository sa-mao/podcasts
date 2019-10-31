import { makeFakePodcast } from '../../__test__/data/podcast'
import makePodcast from './'

describe('Podcast', () => {
  it('must have an url', () => {
    var fakePodcast
    const urls = [
      null,
      undefined,
      ''
    ]
    urls.forEach(url => {
      fakePodcast = makeFakePodcast({ url: url })
      expect(() => makePodcast(fakePodcast)).toThrow(`'${url}' is not a valid url.`)
    })
  })

  it('must have a valid PodcastId', () => {
    var fakePodcast
    const podcastIds = [
      null,
      ''
    ]
    podcastIds.forEach(podcastId => {
      fakePodcast = makeFakePodcast({ podcastId: podcastId })
      expect(() => makePodcast(fakePodcast)).toThrow(`'${podcastId}' is not a valid podcast Id.`)
    })
  })

  it('must have an episodes list', () => {
    var fakePodcast
    const nonValidEpisodes = [
      null,
      '',
      'qddqsdq',
      {}
    ]
    nonValidEpisodes.forEach(episodes => {
      fakePodcast = makeFakePodcast({ episodes: episodes })
      expect(() => makePodcast(fakePodcast)).toThrow(`'${episodes}' is not a valid episodes list.`)
    })
    const episodes = []
    // Empty list of Episodes
    fakePodcast = makeFakePodcast({ episodes: episodes })
    expect(() => makePodcast(fakePodcast)).not.toThrow(`'${episodes}' is not a valid episodes list.`)
    // Non empty List of episodes
    fakePodcast = makeFakePodcast()
    expect(() => makePodcast(fakePodcast)).not.toThrow(`'${episodes}' is not a valid episodes list.`)
  })

  describe('can have an title', () => {
    it('Accept null and undefined as empty owner strings', () => {
      const nullTitles = [
        null,
        undefined,
        ''
      ]

      nullTitles.forEach(title => {
        const fakePodcast = makeFakePodcast({ title: title })
        expect(() => makePodcast(fakePodcast)).not.toThrow()
        const podcast = makePodcast(fakePodcast)
        expect(podcast.getTitle()).toEqual('')
      })
    })

    it('Rejects other non string value', () => {
      const nonValidtTitles = [
        [],
        {},
        4.5
      ]

      nonValidtTitles.forEach(title => {
        const fakePodcast = makeFakePodcast({ title: title })
        expect(() => makePodcast(fakePodcast)).toThrow(`title: '${title}' must be of type string.`)
      })
    })

    it('accept string values', () => {
      const validTitles = [
        'My cool Title'
      ]

      validTitles.forEach(title => {
        const fakePodcast = makeFakePodcast({ title: title })
        expect(() => makePodcast(fakePodcast)).not.toThrow()
        const podcast = makePodcast(fakePodcast)
        expect(podcast.getTitle()).toEqual(title)
      })
    })
  })

  describe('can have an owner', () => {
    it('accept null and undefined as empty owner strings', () => {
      const nullOwners = [
        null,
        undefined,
        ''
      ]
      nullOwners.forEach(owner => {
        const fakePodcast = makeFakePodcast({ owner: owner })
        expect(() => makePodcast(fakePodcast)).not.toThrow()
        const podcast = makePodcast(fakePodcast)
        expect(podcast.getOwner()).toEqual('')
      })
    })

    it('rejects other non string values', () => {
      const nonValidOwners = [
        [],
        {},
        4.5
      ]
      nonValidOwners.forEach(owner => {
        const fakePodcast = makeFakePodcast({ owner: owner })
        expect(() => makePodcast(fakePodcast)).toThrow(`owner: '${owner}' must be of type string.`)
      })
    })

    it('accept string values', () => {
      const validOwners = [
        'oussama@gmail.com'
      ]

      validOwners.forEach(owner => {
        const fakePodcast = makeFakePodcast({ owner: owner })
        expect(() => makePodcast(fakePodcast)).not.toThrow()
        const podcast = makePodcast(fakePodcast)
        expect(podcast.getOwner()).toEqual(owner)
      })
    })
  })

  const fakePodcast = makeFakePodcast({})
  const episodesLength = fakePodcast.episodes.length
  it(`should return a list of episodes of size ${episodesLength}`, () => {
    expect(makePodcast(fakePodcast).getEpisodes().length).toEqual(episodesLength)
  })

  describe('have a toJson function', () => {
    it('it returns a podcast json object', () => {
      const fakePodcast = makeFakePodcast({})

      const podcast = makePodcast(fakePodcast)
      const podcastJson = podcast.toJson()
      podcastJson.podcastId = podcast.getPodcastId()
      expect(podcastJson).toMatchObject(fakePodcast)
    })
  })
  xit('can have a pubDate', () => {})
  xit('can have description', () => {})
  xit('sanitize its title', () => {})
  xit('sanitize its description', () => {})
})
