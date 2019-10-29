export default function makeAddpodcast ({ acast, cache }) {
  return async function addPodcast ({ url } = {}) {
    if (!url) {
      throw new Error('podcast url is required.')
    }

    const cached = await cache.findByUrl({ url })

    if (cached) {
      return cached
    }

    const podcast = await acast.getPodcast({ url })

    if (!podcast) {
      throw new Error('Podcast not found.')
    }

    const inserted = await cache.insertPodcast(podcast)
    return inserted
  }
}
