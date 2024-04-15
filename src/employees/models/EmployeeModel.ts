import { randomUUID } from 'node:crypto'
import employeesData from '../../mocks/employees_new.json'
import { type Comment } from '../../types'
import {
  type CreateParams,
  type DeleteParams,
  type EmployeeSortDate,
  type EmployeeSortNumber,
  type EmployeeSortString,
  type EmployeeWithId,
  type GetByIdParams,
  type GetEmployeesParams,
  type UpdateParams
} from '../EmployeeTypes'
import { isEmployeeToSortDateValue, isEmployeeToSortNumberValue, isEmployeeToSortStringValue, sortEmployeesByDateProperty, sortEmployeesByNumberProperty, sortEmployeesByStringProperty } from '../utils'

export const employees = employeesData as EmployeeWithId[]
const comment: Comment = ''
console.log(comment)

export class EmployeeModel {
  static getEmployees = async ({ limit = 10, sort_by: sortBy }: GetEmployeesParams) => {
    if (sortBy === undefined) {
      return employees.slice(0, limit)
    }

    const sortedEmployees = (() => {
      if (isEmployeeToSortStringValue(sortBy)) {
        return sortEmployeesByStringProperty(employees, sortBy as EmployeeSortString)
      }

      if (isEmployeeToSortNumberValue(sortBy)) {
        return sortEmployeesByNumberProperty(employees, sortBy as EmployeeSortNumber)
      }

      if (isEmployeeToSortDateValue(sortBy)) {
        return sortEmployeesByDateProperty(employees, sortBy as EmployeeSortDate)
      }

      return employees
    })()

    return sortedEmployees.slice(0, limit)
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
