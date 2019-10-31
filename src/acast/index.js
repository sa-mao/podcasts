import axios from 'axios'
import * as R from 'ramda'
import { makeAcast } from './acast'
require('../conf')
// TODO extract this to a config file
const conf = {
  acastRegExp: new RegExp(global.podcastConf.acastRegExp),
  acastFeederBaseUrl: global.podcastConf.acastFeederBaseUrl
}
const acast = makeAcast({
  sendHttpRequest: axios,
  pipe: R.pipe,
  conf: conf
})

export default acast
