import buildMakepodcast from './podcast'
import uuidv4 from 'uuid/v4'
import buildMakeEpisodes from './episode'

const makePodcast = buildMakepodcast({
  uuid: uuidv4
})

const makeEpisodes = buildMakeEpisodes({})
export default makePodcast
export { makeEpisodes }
