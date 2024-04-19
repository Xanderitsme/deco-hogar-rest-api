import { type z } from 'zod'
import { type GetUserQuerySchema, type UserSchema } from './schemas'

export type User = z.infer<typeof UserSchema>

export type UserId = string /* `${string}-${string}-${string}-${string}-${string}` */

export interface UserWithId extends User {
  id: UserId
}

export type GetUsersParams = z.infer<typeof GetUserQuerySchema>

export interface GetByIdParams {
  id: UserId
}

export interface CreateParams {
  input: User
}

export interface DeleteParams {
  id: UserId
}

export interface UpdateParams {
  id: UserId
  input: Partial<UserWithId>
}

export interface UserModelType {
  getAll(params: GetUsersParams): Promise<UserWithId[]>
  getById({ id }: GetByIdParams): Promise<UserWithId | undefined>
  create({ input }: CreateParams): Promise<UserWithId>
  delete({ id }: DeleteParams): Promise<boolean>
  update({ id, input }: UpdateParams): Promise<false | UserWithId>
}
