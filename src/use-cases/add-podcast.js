/**
 * Makes add podcast use case.
 *
 * @export
 * @param {object} {
 *   acast, gateway to acast api
 *   cache cache client
 * }
 * @returns {function} an addPodcast function
 */
export default function makeAddpodcast ({
  acast,
  cache
}) {
  /**
  * Add podcast.
  *
  * @export
  * @param {url} url, a podcast url
  * @returns {podcast} inserted podcast
  */
  return async function addPodcast ({ url } = {}) {
    if (!url) {
      throw new Error('podcast url is required.')
    }

    const cached = await cache.findByUrl(url)
    // Todo: create a podcast from it
    if (cached) {
      return cached
    }

    const podcast = await acast.get(url)

    if (!podcast) {
      throw new Error('Podcast not found.')
    }

    const inserted = await cache.insert(url, podcast.toJson())
    // Try to be fault tolerant to cache issues.
    if (!inserted) {
      return podcast
    }
    return inserted
  }
}
