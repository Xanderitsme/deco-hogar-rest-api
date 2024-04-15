import express from 'express'
import { createServer } from 'node:http'
import { corsMiddleware } from './middlewares/cors'
import { apiRouter } from './routes/api'

const app = express()
const server = createServer(app)

app.use(corsMiddleware())
app.use(express.json())
app.disable('x-powered-by')

app.use('/api', apiRouter)

app.use((_req, res) => {
  return res.status(404).contentType('text/plain; charset=utf-8').send('Not Found')
})

const port = process.env.PORT ?? 3000

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
