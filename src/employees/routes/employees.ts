import express from 'express'
import { EmployeeController } from '../controllers/employee'

export const employeesRouter = express.Router()

// employeesRouter.get('/', (req, res) => {
//   const { date } = req.query

//   if (typeof date !== 'string') return res.status(404).json({ message: 'Please provide a valid date string' })

//   console.log('date:', date, '-', typeof date)

//   const queryDate = new Date(date)
//   const dateString = queryDate.toLocaleDateString('en-GB', { dateStyle: 'short' })
//   // const dateString = queryDate.toLocaleDateString()

//   console.log('queryDate:', queryDate, '-', typeof queryDate)

//   console.log('dateString:', dateString, '-', typeof dateString)

//   return res.status(200).contentType('text/plain; charset=utf-8').send(dateString)
// })

employeesRouter.get('/', EmployeeController.getEmployees)
employeesRouter.get('/:id', EmployeeController.getById)
employeesRouter.post('/', EmployeeController.create)
employeesRouter.delete('/:id', EmployeeController.delete)
employeesRouter.patch('/:id', EmployeeController.update)
