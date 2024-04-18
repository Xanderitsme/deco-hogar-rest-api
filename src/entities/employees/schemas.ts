import { z } from 'zod'
import { isFormattedDate } from '../../utils'
import { EmployeeSortDateConst, EmployeeSortNumberConst, EmployeeSortStringConst } from './constants'
import { type EmployeeSort } from './types'
import { isEmployeeToSortValue } from './utils'

export const EmployeeSchema = z.object({
  name: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dni: z.string().length(8),
  phone: z.string().length(9),
  email: z.string().email().max(50),
  hiringDate: z.string().refine(val => isFormattedDate(val), {
    message: 'Missing or invalid hiring date value, hiringDate must be in <yyyy/mm/dd> format'
  }).transform(val => val.replaceAll(/[- .]/g, '/')),
  salary: z.number().min(1200),
  positionId: z.string().min(1)
})

export const GetEmployeeQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional(),
  sort_by: z.custom<EmployeeSort>(val => {
    return typeof val === 'string' ? isEmployeeToSortValue(val) : false
  }, {
    message: `sort_by query only accepts one of these values: ${[
      ...Object.values(EmployeeSortStringConst),
      ...Object.values(EmployeeSortNumberConst),
      ...Object.values(EmployeeSortDateConst)
    ].join(', ')}`
  }).optional()
})
