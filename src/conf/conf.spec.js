import './'

describe('Config', () => {
  it('Should have mandatoy values', () => {
    expect(global.podcastConf).toHaveProperty('acastRegExp')
    expect(global.podcastConf).toHaveProperty('acastFeederBaseUrl')
  })
})
