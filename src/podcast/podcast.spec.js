import makePodCast from './'

describe('podcast', () => {
  it('Must have an url', () => {
    const podcast = { url: null }
    expect(() => makePodCast(podcast).toThrow('podcast must contain an url'))
  })
})
