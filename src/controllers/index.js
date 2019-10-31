import podcastService from '../use-cases'
import logger from '../logger'
import makeGetEpisodes from './get-episodes'

const getEpisodes = makeGetEpisodes({
  podcastService,
  logger
})

const podcastController = Object.freeze({
  getEpisodes
})

export default podcastController
