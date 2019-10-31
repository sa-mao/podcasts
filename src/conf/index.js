import yaml from 'js-yaml'
import fs from 'fs'
import camelCase from 'camelcase'

const environment = process.env.PRODCAST_ENV || 'DEV'
const envNamespace = 'PODCAST_'

try {
  const defaultConf = yaml.load(fs.readFileSync('conf/default.yaml', 'utf8'))
  const environmentConf = yaml.load(fs.readFileSync(`conf/${environment.toLocaleLowerCase()}.yaml`, 'utf8'))

  const overrides = Object.keys(process.env)
    .filter(key => key.startsWith(envNamespace))
    .reduce((obj, key) => {
      obj[
        camelCase(key
          .split(envNamespace)[1]
          .toLocaleLowerCase())
      ] = process.env[key]
      return obj
    }, {})

  const conf = {
    ...defaultConf,
    ...environmentConf,
    ...overrides
  }
  global.podcastConf = conf
} catch (e) {
  console.debug(e)
  console.error(e.message)
  process.exit(1)
}
