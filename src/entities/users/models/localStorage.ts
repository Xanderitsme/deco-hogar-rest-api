import { randomUUID } from 'node:crypto'
import usersData from '../../../mocks/users.json'
import { type UpdateParams, type CreateParams, type DeleteParams, type GetByIdParams, type GetUsersParams, type UserWithId } from '../types'

const users = usersData as UserWithId[]

export class UserModel {
  static async getAll ({ limit = 10 }: GetUsersParams) {
    return users.slice(0, limit)
  }

  static async getById ({ id }: GetByIdParams) {
    return users.find(user => user.id === id)
  }

  static async create ({ input }: CreateParams) {
    const newUser = {
      id: randomUUID(),
      ...input
    }

    users.push(newUser)

    return newUser
  }

  static async delete ({ id }: DeleteParams) {
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  }

  static async update ({ id, input }: UpdateParams) {
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) return false

    const userToUpdate = users[userIndex]

    for (const property in input) {
      if ((input as any)[property] !== undefined) {
        (userToUpdate as any)[property] = (input as any)[property]
      }
    }

    return userToUpdate
  }
}
