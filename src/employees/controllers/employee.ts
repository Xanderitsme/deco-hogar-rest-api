import { type RequestHandler } from 'express'
import { type Employee } from '../EmployeeTypes'
import { EmployeeModel } from '../models/EmployeeModel'
import { validateEmployee, validateGetEmployeeQuery, validatePartialEmployee } from '../utils'

export class EmployeeController {
  static getEmployees: RequestHandler = async (req, res) => {
    const data = req.query
    const result = validateGetEmployeeQuery(data)

    if (!result.success) {
      return res.status(400).json({
        message: JSON.parse(result.error.message)
      })
    }

    const employees = await EmployeeModel.getEmployees(result.data)

    if (employees.length === 0) return res.status(404).json({ message: 'Employees not found' })
    return res.json(employees)
  }

  static getById: RequestHandler = async (req, res) => {
    const { id } = req.params
    const employee = await EmployeeModel.getById({ id })

    if (employee === undefined) return res.status(404).json({ message: 'Employee not found' })
    return res.json(employee)
  }

  static create: RequestHandler = async (req, res) => {
    const data = req.body as Employee
    const result = validateEmployee(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const newEmployee = await EmployeeModel.create({ input: result.data })

    if (newEmployee === undefined) return res.status(502).json({ message: 'Employee not created' })
    return res.status(201).json(newEmployee)
  }

  static delete: RequestHandler = async (req, res) => {
    const { id } = req.params

    const isEmployeeDeleted = await EmployeeModel.delete({ id })

    if (!isEmployeeDeleted) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json({ message: 'Employee deleted' })
  }

  static update: RequestHandler = async (req, res) => {
    const data = req.body
    const result = validatePartialEmployee(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const { id } = req.params
    const updatedEmployee = await EmployeeModel.update({ id, input: result.data })

    if (updatedEmployee === false) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json(updatedEmployee)
  }
}
