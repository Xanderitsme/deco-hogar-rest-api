import express from 'express'
import { EmployeeController } from '../controllers/employee'

export const employeesRouter = express.Router()

employeesRouter.get('/', EmployeeController.getEmployees)
employeesRouter.get('/:id', EmployeeController.getById)
employeesRouter.post('/', EmployeeController.create)
employeesRouter.delete('/:id', EmployeeController.delete)
employeesRouter.patch('/:id', EmployeeController.update)
