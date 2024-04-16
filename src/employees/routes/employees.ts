import express from 'express'
import { type EmployeeModelType } from '../EmployeeTypes'
import { EmployeeController } from '../controllers/employee'

export const createEmployeeRouter = ({ EmployeeModel }: { EmployeeModel: EmployeeModelType }) => {
  const employeeRouter = express.Router()

  const employeeController = new EmployeeController(EmployeeModel)

  employeeRouter.get('/', employeeController.getEmployees)
  employeeRouter.get('/:id', employeeController.getById)
  employeeRouter.post('/', employeeController.create)
  employeeRouter.delete('/:id', employeeController.delete)
  employeeRouter.patch('/:id', employeeController.update)

  return employeeRouter
}
