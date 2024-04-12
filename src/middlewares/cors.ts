import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:5173'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin: string | undefined, callback) => {
    if (origin === undefined || acceptedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  }
})
