import { Router } from 'express'
import { type Models } from '../types'
import { createApiRouter } from './api.routes'

export const createRouter = ({ models }: { models: Models }) => {
  const router = Router()

  router.use('/api', createApiRouter({ models }))

  router.use((_req, res) => {
    return res.status(404).contentType('text/plain; charset=utf-8').send('Not Found')
  })

  return router
}
