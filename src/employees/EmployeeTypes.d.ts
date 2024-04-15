import { type z } from 'zod'
import { type EmployeeSchema, type GetEmployeeQuerySchema } from './schemas/employees'

// export interface Employee {
//   name: string
//   lastName: string
//   dni: string
//   phone: string
//   email: string
//   hiringDate: string
//   salary: number
//   positionId: string
// }

export type Employee = z.infer<typeof EmployeeSchema>

export type EmployeeId = string /* ${string}-${string}-${string}-${string}-${string} */

export interface EmployeeWithId extends Employee {
  id: EmployeeId
}

// interface GetEmployeesParams {
//   limit?: number
//   sort_by?: string
//   // sort?: sortType
// }

export type GetEmployeesParams = z.infer<typeof GetEmployeeQuerySchema>

export interface GetByIdParams {
  id: EmployeeId
}

export interface CreateParams {
  input: Employee
}

export interface DeleteParams {
  id: EmployeeId
}

export interface UpdateParams {
  id: EmployeeId
  input: Partial<EmployeeWithId>
}
