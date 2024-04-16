import express from 'express'
import { createServer } from 'node:http'
import { corsMiddleware } from './middlewares/cors'
import { createRouter } from './routes'
import { type Models } from './types'

export const createApp = ({ models }: { models: Models }) => {
  const app = express()
  const server = createServer(app)

  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use(createRouter({ models }))

  const port = process.env.PORT ?? 3000

  server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })
}
