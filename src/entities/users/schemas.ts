import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(20),
  image: z.string().url().optional(),
  employeeId: z.string().min(1)
})

export const GetUserQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional()
})
