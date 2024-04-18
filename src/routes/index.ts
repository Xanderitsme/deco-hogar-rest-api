import { Router } from 'express'
import { createApiRouter } from './api.routes'

export const createRouter = () => {
  const router = Router()

  router.use('/api', createApiRouter())

  router.use((_req, res) => {
    return res.status(404).contentType('text/plain; charset=utf-8').send('Not Found')
  })

  return router
}
