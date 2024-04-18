import { createApp } from '../app'
import { EmployeeModel } from '../entities/employees/models/localFileSystem'

export const localModels = {
  EmployeeModel
} as const

createApp({ models: localModels })
