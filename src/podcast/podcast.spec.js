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

  it('can have an title', () => {
    var fakePodcast
    const nullTitles = [
      null,
      undefined,
      ''
    ]

    nullTitles.forEach(title => {
      fakePodcast = makeFakePodcast({ title: title })
      expect(() => makePodcast(fakePodcast)).not.toThrow()
      const podcast = makePodcast(fakePodcast)
      expect(podcast.getTitle()).toEqual('')
    })

    const nonValidtTitles = [
      [],
      {},
      4.5
    ]

    nonValidtTitles.forEach(title => {
      fakePodcast = makeFakePodcast({ title: title })
      expect(() => makePodcast(fakePodcast)).toThrow(`title: '${title}' must be of type string.`)
    })

    const validTitles = [
      'My cool Title'
    ]

    validTitles.forEach(title => {
      fakePodcast = makeFakePodcast({ title: title })
      expect(() => makePodcast(fakePodcast)).not.toThrow()
      const podcast = makePodcast(fakePodcast)
      expect(podcast.getTitle()).toEqual(title)
    })
  })

  it('can have an owner', () => {
    var fakePodcast
    const nullOwners = [
      null,
      undefined,
      ''
    ]

    nullOwners.forEach(owner => {
      fakePodcast = makeFakePodcast({ owner: owner })
      expect(() => makePodcast(fakePodcast)).not.toThrow()
      const podcast = makePodcast(fakePodcast)
      expect(podcast.getOwner()).toEqual('')
    })

    const nonValidOwners = [
      [],
      {},
      4.5
    ]

    nonValidOwners.forEach(owner => {
      fakePodcast = makeFakePodcast({ owner: owner })
      expect(() => makePodcast(fakePodcast)).toThrow(`owner: '${owner}' must be of type string.`)
    })

    const validOwners = [
      'oussama@gmail.com'
    ]

    validOwners.forEach(owner => {
      fakePodcast = makeFakePodcast({ owner: owner })
      expect(() => makePodcast(fakePodcast)).not.toThrow()
      const podcast = makePodcast(fakePodcast)
      expect(podcast.getOwner()).toEqual(owner)
    })
  })

  xit('can have a pubDate', () => {})
  xit('can have description', () => {})
  xit('sanitize its title', () => {})
  xit('sanitize its description', () => {})
})
