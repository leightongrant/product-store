import { connectDB } from '../config/db.js'
import Product from '../models/product.model.js'
import { errorMessage } from '../error/errorHandler.js'

//Get Products
export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find()
		res.status(200).json(products)
	} catch (err) {
		next(errorMessage(404, err.message, err))
	}
}

// Add products
export const addProduct = async (req, res, next) => {
	const product = req.body
	const newProduct = new Product(product)
	try {
		await newProduct.save()
		res.status(200).json({ msg: `${newProduct.name} successfully added` })
	} catch (err) {
		next(errorMessage(500, err.message, err))
	}
}

// Delete product
export const deleteProduct = async (req, res, next) => {
	const id = req.params.id
	try {
		await Product.findByIdAndDelete(id)
		res.status(200).json({ msg: `Product with ${id} deleted` })
	} catch (err) {
		next(errorMessage(404, `Product with ${id} not found`, err))
	}
}

// Edit product
export const editProduct = async (req, res, next) => {
	const {
		params: { id },
	} = req
	const updatedProduct = req.body
	try {
		await Product.findByIdAndUpdate(id, updatedProduct)
		res.status(200).json({ msg: `Product with id ${id} has been updated` })
	} catch (err) {
		next(errorMessage(500, err.message, err))
	}
}
