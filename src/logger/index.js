var debug = console.debug

if (global.podcastConf.logVerbosity !== 'debug') {
  debug = (params) => {}
}

const logger = Object.freeze({
  info: console.info,
  error: console.error,
  debug: debug,
  warn: console.warn
})

export default logger
