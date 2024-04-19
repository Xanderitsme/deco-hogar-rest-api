import { GetUserQuerySchema, UserSchema } from './schemas'

export const validateUser = (object: unknown) => {
  return UserSchema.safeParse(object)
}

export const validatePartialUser = (object: unknown) => {
  return UserSchema.partial().safeParse(object)
}

export const validateGetUserQuery = (object: unknown) => {
  return GetUserQuerySchema.safeParse(object)
}
