import express from 'express'
import './conf'
import podcastController from './controllers'
import morgan from 'morgan'

const app = express()

app.use(morgan('combined'))

app.get(/\/episodes\/?/, async (req, res) => {
  const result = await podcastController.getEpisodes(req)
  res.set(result.headers)
    .type('json')
    .status(result.statusCode)
    .send(result.body)
})

app.use(function (req, res) {
  res.send(404)
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))
export default app
