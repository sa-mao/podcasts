// eslint-disable-next-line no-empty-pattern
export default function buildMakepodcast ({ uuid }) {
  // eslint-disable-next-line no-empty-pattern
  return function makePodcast ({
    url,
    podcastId = uuid(),
    episodes = [],
    owner,
    title
  } = {}) {
    if (!isValidUrl(url)) {
      throw new Error(`'${url}' is not a valid url.`)
    }
    if (!podcastId) {
      throw new Error(`'${podcastId}' is not a valid podcast Id.`)
    }

    if (!episodes || !Array.isArray(episodes)) {
      throw new Error(`'${episodes}' is not a valid episodes list.`)
    }

    if (owner && typeof owner !== 'string') {
      throw new Error(`owner: '${owner}' must be of type string.`)
    }

    if (title && typeof title !== 'string') {
      throw new Error(`title: '${title}' must be of type string.`)
    }
    /*
    const validEpisodes = []
    epispdes.forEach(episode => {
      validEpisodes.push(makeEpisode(episode))
    })
    */

    function isValidUrl (str) {
      if (str && typeof str === 'string') {
        return true
      }
      return false
    }

    return Object.freeze({
      getUrl: () => url,
      getPodcastId: () => podcastId,
      getOwner: () => owner || '',
      getTitle: () => title || ''
      /*,
      getEpisodes: () => validEpisodes
       */
    })
  }
}
