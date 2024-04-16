import { type RequestHandler } from 'express'
import { type Employee, type EmployeeModelType } from '../EmployeeTypes'
import { validateEmployee, validateGetEmployeeQuery, validatePartialEmployee } from '../utils'

export class EmployeeController {
  constructor (private readonly EmployeeModel: EmployeeModelType) {}

  getEmployees: RequestHandler = async (req, res) => {
    const data = req.query
    const result = validateGetEmployeeQuery(data)

    if (!result.success) {
      return res.status(400).json({
        message: JSON.parse(result.error.message)
      })
    }

    const employees = await this.EmployeeModel.getAll(result.data)

    if (employees.length === 0) return res.status(404).json({ message: 'Employees not found' })
    return res.json(employees)
  }

  getById: RequestHandler = async (req, res) => {
    const { id } = req.params
    const employee = await this.EmployeeModel.getById({ id })

    if (employee === undefined) return res.status(404).json({ message: 'Employee not found' })
    return res.json(employee)
  }

  create: RequestHandler = async (req, res) => {
    const data = req.body as Employee
    const result = validateEmployee(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const newEmployee = await this.EmployeeModel.create({ input: result.data })

    if (newEmployee === undefined) return res.status(502).json({ message: 'Employee not created' })
    return res.status(201).json(newEmployee)
  }

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params

    const isEmployeeDeleted = await this.EmployeeModel.delete({ id })

    if (!isEmployeeDeleted) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json({ message: 'Employee deleted' })
  }

  update: RequestHandler = async (req, res) => {
    const data = req.body
    const result = validatePartialEmployee(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const { id } = req.params
    const updatedEmployee = await this.EmployeeModel.update({ id, input: result.data })

    if (updatedEmployee === false) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json(updatedEmployee)
  }
}
