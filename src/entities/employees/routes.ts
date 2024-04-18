import { Router } from 'express'
import { EmployeeController } from './controller'
import { EmployeeModel as localFileSystemModel } from './models/localFileSystem'

export const createEmployeeRouter = () => {
  const employeeRouter = Router()

  const employeeController = (() => {
    return new EmployeeController(localFileSystemModel)
  })()

  employeeRouter.get('/', employeeController.getEmployees)
  employeeRouter.get('/:id', employeeController.getById)
  employeeRouter.post('/', employeeController.create)
  employeeRouter.delete('/:id', employeeController.delete)
  employeeRouter.patch('/:id', employeeController.update)

  return employeeRouter
}
