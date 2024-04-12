import { randomUUID } from 'node:crypto'
import employeesData from '../../services/employees.json'
import {
  type EmployeeWithIdType,
  type GetEmployeesParams,
  type GetByIdParams,
  type CreateParams,
  type DeleteParams,
  type UpdateParams
} from '../EmployeeTypes'

const employees = employeesData as EmployeeWithIdType[]

export class EmployeeModel {
  static getEmployees = async ({ limit = 10 }: GetEmployeesParams) => {
    return employees.slice(0, limit)
  }

  static getById = async ({ id }: GetByIdParams) => {
    return employees.find(user => user.id === id)
  }

  static create = async ({ input }: CreateParams) => {
    const newEmployee = {
      id: randomUUID(),
      ...input
    }

    employees.push(newEmployee)

    return newEmployee
  }

  static delete = async ({ id }: DeleteParams) => {
    const employeeIndex = employees.findIndex(employee => employee.id === id)

    if (employeeIndex === -1) return false

    employees.splice(employeeIndex, 1)
    return true
  }

  static update = async ({ id, input }: UpdateParams) => {
    const employeeIndex = employees.findIndex(employee => employee.id === id)

    if (employeeIndex === -1) return false

    const employeeToUpdate = employees[employeeIndex]

    for (const property in input) {
      if ((input as any)[property] !== undefined) {
        (employeeToUpdate as any)[property] = (input as any)[property]
      }
    }

    return employeeToUpdate
  }
}
