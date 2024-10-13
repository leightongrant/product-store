import axios from 'axios'

export const rootLoader = () => {
	console.log('Root Loader')
	return [
		{ test1: 1, test2: 2 },
		{ test3: 3, test4: 4 },
	]
}

export const productsLoader = async () => {
	try {
		const res = await axios.get('http://localhost:8000/api/products')
		if (res.status === 200) {
			if (res.data.length === 0) {
				return null
			}
			return res.data
		}
		throw new Error('Unable to fetch data')
	} catch (err) {
		return { error: true, message: err.message }
	}
}
