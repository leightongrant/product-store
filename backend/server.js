import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import router from './routes/routes.js'
import errorHandler from './error/errorHandler.js'
import cors from 'cors'
// import { URL } from 'node:url'
// const __dirname = new URL('..', import.meta.url).pathname
import path from 'node:path'

const __dirname = path.resolve()
const app = express()
const port = process.env.PORT || 8000
connectDB()
app.use(express.json())
// app.use(morgan('tiny'))
app.use(cors())

app.use(router)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/dist')))

	app.get('*', (req, res, next) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
	})
}

app.listen(port, () => console.log(`Server listening on port ${port || 8000}`))
