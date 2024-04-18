import { EmployeeSortDateConst, EmployeeSortNumberConst, EmployeeSortStringConst } from './constants'
import { type EmployeeSortDate, type EmployeeSortNumber, type EmployeeSortString, type EmployeeWithId } from './types'
import { EmployeeSchema, GetEmployeeQuerySchema } from './schemas'

export const validateEmployee = (object: unknown) => {
  return EmployeeSchema.safeParse(object)
}

export const validatePartialEmployee = (object: unknown) => {
  return EmployeeSchema.partial().safeParse(object)
}

export const validateGetEmployeeQuery = (object: unknown) => {
  return GetEmployeeQuerySchema.safeParse(object)
}

export const EmployeeStringProperty = (employee: EmployeeWithId, property: EmployeeSortString) => {
  return employee[property]
}

export const EmployeeNumberProperty = (employee: EmployeeWithId, property: EmployeeSortNumber) => {
  return employee[property]
}

export const EmployeeDateProperty = (employee: EmployeeWithId, property: EmployeeSortDate) => {
  return employee[property]
}

export const isEmployeeToSortValue = (param: string) => (
  isEmployeeToSortStringValue(param) ||
  isEmployeeToSortNumberValue(param) ||
  isEmployeeToSortDateValue(param)
)

export const isEmployeeToSortStringValue = (param: string) => Object.values(EmployeeSortStringConst).includes(param as EmployeeSortString)
export const isEmployeeToSortNumberValue = (param: string) => Object.values(EmployeeSortNumberConst).includes(param as EmployeeSortNumber)
export const isEmployeeToSortDateValue = (param: string) => Object.values(EmployeeSortDateConst).includes(param as EmployeeSortDate)

export const sortEmployeesByStringProperty = (employees: EmployeeWithId[], sortBy: EmployeeSortString) => {
  return employees.toSorted((a, b) => (
    EmployeeStringProperty(a, sortBy).localeCompare(EmployeeStringProperty(b, sortBy))
  ))
}

export const sortEmployeesByNumberProperty = (employees: EmployeeWithId[], sortBy: EmployeeSortNumber) => {
  return employees.toSorted((a, b) => EmployeeNumberProperty(b, sortBy) - EmployeeNumberProperty(a, sortBy))
}

export const sortEmployeesByDateProperty = (employees: EmployeeWithId[], sortBy: EmployeeSortDate) => {
  return employees.toSorted((a, b) => (
    new Date(EmployeeDateProperty(b, sortBy)).getTime() - new Date(EmployeeDateProperty(a, sortBy)).getTime()
  ))
}
