import { Router } from 'express'
import { EmployeeController } from './controller'
import { EmployeeModel as localStorage } from './models/localStorage'

export const createEmployeeRouter = () => {
  const employeeRouter = Router()

  const employeeController = (() => {
    return new EmployeeController(localStorage)
  })()

  employeeRouter.get('/', employeeController.getAll)
  employeeRouter.get('/:id', employeeController.getById)
  employeeRouter.post('/', employeeController.create)
  employeeRouter.delete('/:id', employeeController.delete)
  employeeRouter.patch('/:id', employeeController.update)

  return employeeRouter
}
