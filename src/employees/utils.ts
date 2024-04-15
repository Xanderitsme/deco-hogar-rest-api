import { EmployeeToSortDate, EmployeeToSortNumber, EmployeeToSortString } from './EmployeeEnums'
import { type EmployeeWithId } from './EmployeeTypes'
import { EmployeeSchema, GetEmployeeQuerySchema } from './schemas/employees'

export const validateEmployee = (object: unknown) => {
  return EmployeeSchema.safeParse(object)
}

export const validatePartialEmployee = (object: unknown) => {
  return EmployeeSchema.partial().safeParse(object)
}

export const validateGetEmployeeQuery = (object: unknown) => {
  return GetEmployeeQuerySchema.safeParse(object)
}

export const isDateFormated = (string: string) => {
  return /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/.test(string)
}

export const compareEmployeeStringProperties: Record<string, (employee: EmployeeWithId) => string> = {
  [EmployeeToSortString.NAME]: (employee: EmployeeWithId) => employee.name,
  [EmployeeToSortString.LAST_NAME]: (employee: EmployeeWithId) => employee.lastName,
  [EmployeeToSortString.EMAIL]: (employee: EmployeeWithId) => employee.email
}

export const compareEmployeeNumberProperties: Record<string, (employee: EmployeeWithId) => number> = {
  [EmployeeToSortNumber.SALARY]: (employee: EmployeeWithId) => employee.salary
}

export const compareEmployeeDateProperties: Record<string, (employee: EmployeeWithId) => string> = {
  [EmployeeToSortDate.HIRING_DATE]: (employee: EmployeeWithId) => employee.hiringDate
}

export const isEmployeeToSortValue = (param: string) => (
  isEmployeeToSortStringValue(param) ||
  isEmployeeToSortNumberValue(param) ||
  isEmployeeToSortDateValue(param)
)

export const isEmployeeToSortStringValue = (param: string) => Object.values(EmployeeToSortString).includes(param as EmployeeToSortString)
export const isEmployeeToSortNumberValue = (param: string) => Object.values(EmployeeToSortNumber).includes(param as EmployeeToSortNumber)
export const isEmployeeToSortDateValue = (param: string) => Object.values(EmployeeToSortDate).includes(param as EmployeeToSortDate)

export const sortEmployeesByStringProperty = (employees: EmployeeWithId[], sortBy: EmployeeToSortString) => {
  return employees.toSorted((a, b) => (
    compareEmployeeStringProperties[sortBy](a).localeCompare(compareEmployeeStringProperties[sortBy](b))
  ))
}

export const sortEmployeesByNumberProperty = (employees: EmployeeWithId[], sortBy: EmployeeToSortNumber) => {
  return employees.toSorted((a, b) => compareEmployeeNumberProperties[sortBy](a) - compareEmployeeNumberProperties[sortBy](b))
}

export const sortEmployeesByDateProperty = (employees: EmployeeWithId[], sortBy: EmployeeToSortDate) => {
  return employees.toSorted((a, b) => compareEmployeeNumberProperties[sortBy](a) - compareEmployeeNumberProperties[sortBy](b))
}
