export default function makeGetEpisodes ({ podcastService, logger }) {
  return async function getEpisodes (request) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const url = request.query.podcastUrl
      const podcast = await podcastService.addPodcast({ url })

      return {
        headers,
        statusCode: 200,
        body: podcast.getEpisodes()
      }
    } catch (e) {
      var statusCode
      switch (e.message) {
        case 'Podcast not found.':
          logger.info(e.message)
          statusCode = 404
          break
        case 'podcast url is required.':
          logger.info(e.message)
          statusCode = 400
          break
        default:
          logger.info(e.message)
          logger.debug(e)
          statusCode = 500
          break
      }
      return {
        headers,
        statusCode,
        body: {
          error: e.message
        }
      }
    }
  }
}
