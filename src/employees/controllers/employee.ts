import { EmployeeModel } from '../models/employee'
import { type RequestHandler } from 'express'
import { validateEmployee, validatePartialEmployee } from '../schemas/employees'
import { type EmployeeType } from '../EmployeeTypes'

export class EmployeeController {
  static getEmployees: RequestHandler = async (req, res) => {
    const { limit } = req.query

    const limitEmployees = isNaN(Number(limit)) ? undefined : Number(limit)

    const employees = await EmployeeModel.getEmployees({ limit: limitEmployees })

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
    const data = req.body as EmployeeType
    const result = validateEmployee({ ...data, hiringDate: new Date(data?.hiringDate) })

    if (!result.success) {
      return res.status(404).json({
        error: JSON.parse(result.error.message)
      })
    }

    const input = {
      ...result.data,
      hiringDate: result.data.hiringDate.toLocaleDateString('en-GB', { dateStyle: 'short' })
    }

    const newEmployee = await EmployeeModel.create({ input })

    if (newEmployee === undefined) return res.status(404).json({ message: 'Employee not created' })
    return res.status(201).json(newEmployee)
  }

  static delete: RequestHandler = async (req, res) => {
    const { id } = req.params

    const isEmployeeDeleted = await EmployeeModel.delete({ id })

    if (!isEmployeeDeleted) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json({ message: 'Employee deleted' })
  }

  static update: RequestHandler = async (req, res) => {
    const data = req.body as Partial<EmployeeType>
    const inputData = data?.hiringDate !== undefined ? { ...data, hiringDate: new Date(data?.hiringDate) } : data
    const result = validatePartialEmployee(inputData)

    if (!result.success) {
      return res.status(404).json({
        error: JSON.parse(result.error.message)
      })
    }

    const input = result.data.hiringDate !== undefined
      ? {
          ...result.data,
          hiringDate: result.data.hiringDate.toLocaleDateString('es-PE', { dateStyle: 'short' })
        }
      : {
          ...result.data,
          hiringDate: undefined
        }

    const { id } = req.params
    const updatedEmployee = await EmployeeModel.update({ id, input })

    if (updatedEmployee === false) return res.status(404).json({ message: 'Employee not found' })
    return res.status(200).json(updatedEmployee)
  }
}
