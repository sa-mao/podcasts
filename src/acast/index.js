import axios from 'axios'
import * as R from 'ramda'
import xml2json from 'xml2json'
import { makeAcast } from './acast'

const parserOptions = {
  sanitize: true,
  object: true
}
const parser = {
  toJson: (xml) => xml2json.toJson(xml, parserOptions)
}
const acast = makeAcast({
  sendHttpRequest: axios,
  pipe: R.pipe,
  parser
})

export default acast
