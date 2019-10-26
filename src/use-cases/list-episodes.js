export default function makeListEpisodes ({ cache }) {
  return async function listEpisodes ({ podCastId } = {}) {
    if (!podCastId) {
      throw new Error('Podcast Id is required.')
    }

    const podCast = await cache.findById({
      podCastId
    })

    return getEpisodes(podCast)

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
