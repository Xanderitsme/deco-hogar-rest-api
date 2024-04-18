import { Router } from 'express'
import { type EmployeeModelType } from './types'
import { EmployeeController } from './controller'

export const createEmployeeRouter = ({ EmployeeModel }: { EmployeeModel: EmployeeModelType }) => {
  const employeeRouter = Router()

  const employeeController = new EmployeeController(EmployeeModel)

  employeeRouter.get('/', employeeController.getEmployees)
  employeeRouter.get('/:id', employeeController.getById)
  employeeRouter.post('/', employeeController.create)
  employeeRouter.delete('/:id', employeeController.delete)
  employeeRouter.patch('/:id', employeeController.update)

  return employeeRouter
}
