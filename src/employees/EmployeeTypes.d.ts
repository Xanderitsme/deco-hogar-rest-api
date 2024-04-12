export interface EmployeeType {
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  hiringDate: string
  salary: number
  positionId: string
}

export type EmployeeIdType = string /* ${string}-${string}-${string}-${string}-${string} */

export interface EmployeeWithIdType extends EmployeeType {
  id: EmployeeIdType
}

interface GetEmployeesParams {
  limit?: number
}

interface GetByIdParams {
  id: EmployeeIdType
}

interface CreateParams {
  input: EmployeeType
}

interface DeleteParams {
  id: EmployeeIdType
}

interface UpdateParams {
  id: EmployeeIdType
  input: Partial<EmployeeWithIdType>
}
