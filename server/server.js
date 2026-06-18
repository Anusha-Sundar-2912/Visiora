import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

import connectDB from './configs/mongodb.js'

import errorHandler from './middlewares/errorHandler.js'

const app = express()

// ---------------------
// Middleware
// ---------------------

app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'token']
}))

app.use(morgan('dev'))

// ---------------------
// Routes
// ---------------------

app.use('/api/user', userRouter)

app.use('/api/image', imageRouter)

// Root Endpoint

app.get('/', (req, res) => {
  res.send('Visiora API Running')
})

// Health Endpoint

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Visiora API',
    timestamp: new Date().toISOString()
  })
})

// Error Middleware

app.use(errorHandler)

// ---------------------
// Start Server
// ---------------------

const PORT = process.env.PORT || 10000

connectDB()
  .then(() => {

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      )
    })

  })
  .catch(err => {

    console.error(
      'DB connection failed:',
      err
    )

    process.exit(1)

  })