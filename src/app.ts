import express from 'express'
import { corsMiddleware } from './middlewares/cors'
import { createRouter } from './routes'
import { envs } from './config/envs'
import { type Comment } from './types'

export const createApp = () => {
  const app = express()

  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use(createRouter())

  const port = envs.PORT

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })
}

const comment: Comment = ''
console.log(comment)

createApp()
