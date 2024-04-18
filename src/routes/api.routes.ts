import { Router } from 'express'
import { createEmployeeRouter } from '../entities/employees/routes'
import { type Models } from '../types'

export const createApiRouter = ({ models }: { models: Models }) => {
  const apiRouter = Router()

  apiRouter.use('/employees', createEmployeeRouter({ EmployeeModel: models.EmployeeModel }))

  return apiRouter
}
