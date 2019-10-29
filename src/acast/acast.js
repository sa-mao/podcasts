import makePodcast from '../podcast'
export function makeAcast ({
  pipe,
  sendHttpRequest,
  parser
}) {
  return Object.freeze({
    get: getPodcast
  })

  async function getPodcast (url) {
    if (!url || url === ' ') {
      throw new Error('podcast url is required.')
    }
    const callAcastApi = pipe(
      buildGetPodcastCommand,
      sendHttpRequest,
      (response) => handleAcastResponse(response, parser)
    )
    try {
      const podcast = await callAcastApi(url)
      return podcast
    } catch (e) {
      /* TODO: More error handling:
        it should handle 404 not found.
        it should handle 5xx.
        it should handle own server failures
      */
      console.error(e.message)
      console.debug(e)
      //console.log(e.response.data)
      //console.log(parser.toJson(e.response.data))
      return null
    }
  }
}

export function buildGetPodcastCommand (url) {
  return {
    method: 'get',
    url: url
  }
}
// TODO: it should return a valid Podcast.
export async function handleAcastResponse (response, parser) {
  const [result] = await Promise.all([response])
  return parser.toJson(result.data)
}
