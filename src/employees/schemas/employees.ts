import { z } from 'zod'
import { EmployeeToSortValue } from '../EmployeeEnums'
import { isDateFormated, isEmployeeToSortValue } from '../utils'

export const EmployeeSchema = z.object({
  name: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dni: z.string().length(8),
  phone: z.string().length(9),
  email: z.string().email().max(50),
  hiringDate: z.string().refine(val => isDateFormated(val), {
    message: 'Missing or invalid hiring date value, hiringDate must be formateed like dd/mm/yyyy'
  }).transform(val => val.replaceAll(/[- .]/g, '/')),
  salary: z.number().min(1200),
  positionId: z.string().min(1)
})

// export const sorting = {
//   NAME: 'name',
//   LAST_NAME: 'lastName',
//   EMAIL: 'email'
// } as const

// export type sortType = typeof sorting[keyof typeof sorting]

export const GetEmployeeQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional(),
  sort_by: z.string().refine(val => isEmployeeToSortValue(val), {
    message: `sort_by query only accepts one of these values: ${Object.values(EmployeeToSortValue).join(', ')}`
  }).optional()
  // sort: custom<sortType>(val => {
  //   return typeof val === 'string' ? isEmployeeToSortValue(val) : false
  // }).optional()
})
