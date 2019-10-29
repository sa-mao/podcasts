export default function makeListEpisodes ({ cache }) {
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
