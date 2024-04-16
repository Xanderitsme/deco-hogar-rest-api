import { type z } from 'zod'
import { type EmployeeSortDateConst, type EmployeeSortNumberConst, type EmployeeSortStringConst } from './EmployeeConstants'
import { type EmployeeSchema, type GetEmployeeQuerySchema } from './schemas/employees'

export type Employee = z.infer<typeof EmployeeSchema>

export type EmployeeId = string /* ${string}-${string}-${string}-${string}-${string} */

export interface EmployeeWithId extends Employee {
  id: EmployeeId
}

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

export interface EmployeeModelType {
  getAll(params: GetEmployeesParams): Promise<EmployeeWithId[]>
  getById({ id }: GetByIdParams): Promise<EmployeeWithId | undefined>
  create({ input }: CreateParams): Promise<EmployeeWithId>
  delete({ id }: DeleteParams): Promise<boolean>
  update({ id, input }: UpdateParams): Promise<false | EmployeeWithId>
}

// export type EmployeeModelType = GenericModelType<
// EmployeeWithId,
// GetEmployeesParams,
// GetByIdParams,
// CreateParams,
// DeleteParams,
// UpdateParams
// >

export type EmployeeSortString = typeof EmployeeSortStringConst[keyof typeof EmployeeSortStringConst]

export type EmployeeSortNumber = typeof EmployeeSortNumberConst[keyof typeof EmployeeSortNumberConst]

export type EmployeeSortDate = typeof EmployeeSortDateConst[keyof typeof EmployeeSortDateConst]

export type EmployeeSort = EmployeeSortString | EmployeeSortNumber | EmployeeSortDate
