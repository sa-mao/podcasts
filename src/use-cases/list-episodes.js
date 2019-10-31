/**
 * makes list episodes use case
 *
 * @export
 * @param {*} { cache } cache client
 * @returns {function} a listEpisodes function.
 */
export default function makeListEpisodes ({ cache }) {
  /**
  * List podcast's episodes.
  *
  * @export
  * @param {id} podcastId, a podcast url
  * @returns {array} of episodes
  */
  return async function listEpisodes ({ podcastId } = {}) {
    if (!podcastId) {
      throw new Error('podcast Id is required.')
    }

    const podcast = await cache.findById({
      podcastId
    })

    return getEpisodes(podcast)

    function getEpisodes (podcast) {
      if (podcast.item.length === 0) {
        return []
      }
      return podcast.item.map((episode) => {
        return {
          title: episode.title,
          checksum: episode.checksum,
          url: episode.link
        }
      })
    }
  }
}
