import express from 'express'
import { employeesRouter } from '../employees/routes/employees'

export const apiRouter = express.Router()

apiRouter.use('/employees', employeesRouter)
