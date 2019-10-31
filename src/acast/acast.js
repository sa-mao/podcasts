import makePodcast from '../podcast'
export function makeAcast ({
  pipe,
  sendHttpRequest,
  conf
}) {
  return Object.freeze({
    get: getPodcast
  })

  async function getPodcast (url) {
    if (!url || url === '') {
      throw new Error('podcast url is required.')
    }

    const found = url.match(conf.acastRegExp)
    if (!found) {
      throw new Error(`Podcast url: '${url}' is not a valid Acast url`)
    }
    const show = found[1]
    const callAcastApi = pipe(
      (show) => buildFeederUrl(show, conf),
      buildGetPodcastCommand,
      sendHttpRequest,
      handleAcastResponse
    )
    try {
      const podcast = await callAcastApi(show)
      return podcast
    } catch (e) {
      /* TODO: More error handling:
        it should handle 404 not found.
        it should handle 5xx.
        it should handle own server failures
      */
      return null
    }
  }
}

export function buildFeederUrl (show, conf) {
  return conf.acastFeederBaseUrl + show
}
export function buildGetPodcastCommand (url) {
  return {
    method: 'get',
    url: url
  }
}
// TODO: it should return a valid Podcast.
export async function handleAcastResponse (response) {
  const [result] = await Promise.all([response])

  const podcast = makePodcast({
    title: result.data.title,
    owner: result.data.owner.email,
    episodes: result.data.episodes,
    url: result.data.feedUrl
  })

  return podcast
}
