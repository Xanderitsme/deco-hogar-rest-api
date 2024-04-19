import { Router } from 'express'
import { createEmployeeRouter } from '../entities/employees/routes'
import { createUserRouter } from '../entities/users/routes'

export const createApiRouter = () => {
  const apiRouter = Router()

  apiRouter.use('/employees', createEmployeeRouter())
  apiRouter.use('/users', createUserRouter())

  return apiRouter
}
