import { Router } from 'express'
import { UserController } from './controller'
import { UserModel as localStorage } from './models/localStorage'

export const createUserRouter = () => {
  const userRouter = Router()

  const userController = (() => {
    return new UserController(localStorage)
  })()

  userRouter.get('/', userController.getAll)
  userRouter.get('/:id', userController.getById)
  userRouter.post('/', userController.create)
  userRouter.delete('/:id', userController.delete)
  userRouter.patch('/:id', userController.update)

  return userRouter
}
