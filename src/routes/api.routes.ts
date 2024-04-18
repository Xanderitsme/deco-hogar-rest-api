import { Router } from 'express'
import { createEmployeeRouter } from '../entities/employees/routes'

export const createApiRouter = () => {
  const apiRouter = Router()

  apiRouter.use('/employees', createEmployeeRouter())

  return apiRouter
}
