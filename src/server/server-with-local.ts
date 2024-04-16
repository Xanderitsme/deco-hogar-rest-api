import { createApp } from '../app'
import { EmployeeModel } from '../employees/models/local-file-system/EmployeeModel'

export const localModels = {
  EmployeeModel
} as const

createApp({ models: localModels })
