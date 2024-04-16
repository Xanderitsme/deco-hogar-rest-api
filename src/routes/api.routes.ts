import { Router } from 'express'
import { createEmployeeRouter } from '../employees/Employees.routes'
import { type Models } from '../types'

export const createApiRouter = ({ models }: { models: Models }) => {
  const apiRouter = Router()

  apiRouter.use('/employees', createEmployeeRouter({ EmployeeModel: models.EmployeeModel }))

  return apiRouter
}
