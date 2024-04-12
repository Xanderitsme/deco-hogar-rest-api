import z from 'zod'

const employeeSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  dni: z.string().length(8),
  phone: z.string().length(9),
  email: z.string().email(),
  hiringDate: z.date().min(new Date('2000-01-01'), { message: 'Too old' }),
  salary: z.number().min(1100),
  positionId: z.string()
})

export const validateEmployee = (object: unknown) => {
  return employeeSchema.safeParse(object)
}

export const validatePartialEmployee = (object: unknown) => {
  return employeeSchema.partial().safeParse(object)
}
