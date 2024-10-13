import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import router from './routes/routes.js'
import errorHandler, { routeNotFound } from './error/errorHandler.js'
import cors from 'cors'
import { URL } from 'node:url'
const __dirname = new URL('..', import.meta.url).pathname

console.log(process.env.NODE_ENV)

const app = express()
const port = process.env.PORT || 8000
connectDB()
app.use(express.json())
// app.use(morgan('tiny'))
app.use(cors())
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(`${__dirname}/frontend/dist/`))
}

app.use(router)

app.use(routeNotFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server listening on port ${port || 8000}`))
