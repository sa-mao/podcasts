import makeAddpodcast from './add-podcast'
import makeListEpisodes from './list-episodes'
import cacheDb from '../cacheDb'
import acast from '../acast'

const addPodcast = makeAddpodcast({
  acast,
  cache: cacheDb
})
const listEpisodes = makeListEpisodes({
  acast,
  cache: cacheDb
})

const podcastService = Object.freeze({
  addPodcast,
  listEpisodes
})
export default podcastService
