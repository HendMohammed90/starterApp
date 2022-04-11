import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'


const PORT = config.port || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('dev'))
// HTTP security middleware headers
app.use(helmet())
// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 minute
    max: 2, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      'el3b b3ed ya ro7 mama Too Many Requests From That IP Try Again Ba3d Saa3a 😂',
  })
)

// Add routing for main Path
app.get('/', (req: Request, res: Response) => {
  // throw new Error('There is an error here')
  res.json({
    message: 'Hello World 🌍',
  })
})

// error handler middleware
app.use(errorMiddleware)

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh you are lost, read the API documentation to find your way back home 😂',
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app

// "dev": "nodemon src/index.ts",
// "build": "tsc",
// "start": "npm run build && node dist/index.js",
// "format": "prettier --write src/**/*.ts",
// "test": "npm run build && jasmine",
// "lint": "eslint src/**/*.ts",
// "lint:fix": "eslint --fix"
// mohammedelzanaty <mohammedelzanaty129@gmail.com>
// https://github.com/mohammedelzanaty/express-api-typescript-jasmine.git
// express-api-typescript-jasmine
// starterApp/src