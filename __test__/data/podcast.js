import faker from 'faker'
import uuidv4 from 'uuid/v4'

export function makeFakePodcast (overrides) {
  const podcast = {
    url: faker.internet.url(),
    podcastId: uuidv4(),
    episodes: generateEpisodes(),
    owner: faker.internet.email()
  }

  function generateEpisodes () {
    const min = 1
    const max = 5
    const episodesLength = Math.random() * (max - min) + min
    const episodes = []
    for (var i = 0; i < episodesLength; i++) {
      episodes[i] = makeFakeEpisode()
    }
    return episodes
  }

  return {
    ...podcast,
    ...overrides
  }
}

export function makeFakeEpisode (overrides) {
  const episode = {
    title: faker.hacker.phrase(),
    url: faker.internet.url(),
    checksum: faker.internet.mac()

  }
  return {
    ...episode,
    ...overrides
  }
}
