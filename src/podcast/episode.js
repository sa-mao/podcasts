export default function buildMakeEpisodes () {
  return function makeEpisodes (episodes) {
    const validEpisodes = episodes.map(validateEpisode)

    function validateEpisode ({
      title,
      url,
      checkSum,
      checksum
    } = {}) {
      if (!title || typeof title !== 'string') {
        throw new Error(`'${title}' is not a valid title`)
      }

      if (!url || typeof url !== 'string') {
        throw new Error(`'${url}' is not a valid url`)
      }
      const myCheckSum = checkSum || checksum
      if (!myCheckSum || typeof myCheckSum !== 'string') {
        throw new Error(`'${myCheckSum}' is not a valid checksum`)
      }

      return {
        title: title,
        url: url,
        checksum: myCheckSum
      }
    }

    return validEpisodes
  }
}
