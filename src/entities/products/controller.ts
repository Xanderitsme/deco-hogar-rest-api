import { type RequestHandler } from 'express'

export class ProductController {
  constructor (private readonly ProductModel: any) {}

  getAll: RequestHandler = async (_req, res) => {
    return res.status(200).json({ message: '' })
  }
}
