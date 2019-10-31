import { makeFakeEpisode, makeFakePodcast } from '../../__test__/data/podcast'
import { makeEpisodes } from './'

describe('Episode', () => {
  it('must have a valid title', () => {
    const nonValidTitles = [
      undefined,
      null,
      '',
      [],
      {}
    ]
    nonValidTitles.forEach(title => {
      const fakeEpisode = makeFakeEpisode({ title: title })
      expect(() => makeEpisodes([fakeEpisode])).toThrow(`'${title}' is not a valid title`)
    })

    const validTitles = [
      'Cool episode title',
      '#'
    ]
    validTitles.forEach(title => {
      const fakeEpisode = makeFakeEpisode({ title: title })
      expect(() => makeEpisodes([fakeEpisode])).not.toThrow()
      expect(makeEpisodes([fakeEpisode])[0].title).toEqual(title)
    })
  })

  it('must have a valid url', () => {
    const nonValidurls = [
      undefined,
      null,
      '',
      [],
      {}
    ]
    nonValidurls.forEach(url => {
      const fakeEpisode = makeFakeEpisode({ url: url })
      expect(() => makeEpisodes([fakeEpisode])).toThrow(`'${url}' is not a valid url`)
    })

    const fakeEpisode = makeFakeEpisode({})
    expect(() => makeEpisodes([fakeEpisode])).not.toThrow()
    expect(makeEpisodes([fakeEpisode])[0].url).toEqual(fakeEpisode.url)
  })

  it('must have a valid checksum', () => {
    const nonValidChecksums = [
      undefined,
      null,
      '',
      [],
      {}
    ]
    nonValidChecksums.forEach(checksum => {
      const fakeEpisode = makeFakeEpisode({ checksum: checksum })
      expect(() => makeEpisodes([fakeEpisode])).toThrow(`'${checksum}' is not a valid checksum`)
    })

    const fakeEpisode = makeFakeEpisode({})
    expect(() => makeEpisodes([fakeEpisode])).not.toThrow()
    expect(makeEpisodes([fakeEpisode])[0].checksum).toEqual(fakeEpisode.checksum)
  })
  const fakePodcast = makeFakePodcast({})
  const episodesLength = fakePodcast.episodes.length
  it(`should return a list of episodes of size ${episodesLength}`, () => {
    expect(makeEpisodes(fakePodcast.episodes).length).toEqual(episodesLength)
  })
})
