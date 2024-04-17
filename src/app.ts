import express from 'express'
import { corsMiddleware } from './middlewares/cors'
import { createRouter } from './routes'
import { type Models } from './types'

export const createApp = ({ models }: { models: Models }) => {
  const app = express()

  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use(createRouter({ models }))

  const port = process.env.PORT ?? 3000

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })
}
