import express from 'express'
import {
	addProduct,
	getProducts,
	deleteProduct,
	editProduct,
} from './controllers.js'
const router = express.Router()

router.get('/', (req, res, next) => {
	res.send(200)
})
router.get('/api/products', getProducts)
router.post('/api/products', addProduct)
router.delete('/api/products/:id', deleteProduct)
router.put('/api/products/:id', editProduct)

export default router
