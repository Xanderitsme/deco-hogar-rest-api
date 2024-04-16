import express from 'express'
import { createEmployeeRouter } from '../employees/routes/employees'
import { type Models } from '../types'

export const createApiRouter = ({ models }: { models: Models }) => {
  const apiRouter = express.Router()

  apiRouter.use('/employees', createEmployeeRouter({ EmployeeModel: models.EmployeeModel }))

  return apiRouter
}
