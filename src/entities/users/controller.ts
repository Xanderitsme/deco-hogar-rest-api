import { type RequestHandler } from 'express'
import { type UserModelType } from './types'
import { validateGetUserQuery, validatePartialUser, validateUser } from './utils'

export class UserController {
  constructor (private readonly UserModel: UserModelType) {}

  getAll: RequestHandler = async (req, res) => {
    const data = req.query
    const result = validateGetUserQuery(data)

    if (!result.success) {
      return res.status(400).json({
        message: JSON.parse(result.error.message)
      })
    }

    const users = await this.UserModel.getAll(result.data)

    if (users.length === 0) return res.status(404).json({ message: 'Users not found' })
    return res.status(200).json(users)
  }

  getById: RequestHandler = async (req, res) => {
    const { id } = req.params
    const user = await this.UserModel.getById({ id })

    if (user === undefined) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json(user)
  }

  create: RequestHandler = async (req, res) => {
    const data = req.body
    const result = validateUser(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const newUser = await this.UserModel.create({ input: result.data })

    if (newUser === undefined) return res.status(502).json({ message: 'User not created' })
    return res.status(201).json(newUser)
  }

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params

    const isUserDeleted = await this.UserModel.delete({ id })

    if (!isUserDeleted) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json({ message: 'User deleted' })
  }

  update: RequestHandler = async (req, res) => {
    const data = req.body
    const result = validatePartialUser(data)

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const { id } = req.params
    const updatedUser = await this.UserModel.update({ id, input: result.data })

    if (updatedUser === false) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json(updatedUser)
  }
}
