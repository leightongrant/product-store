import {
	Container,
	FormControl,
	FormLabel,
	Input,
	Button,
	Grid,
	useBoolean,
	useToast,
} from '@chakra-ui/react'

import { useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { ProductContext } from './PageLayout'

const Create = ({ editProduct, action, onClose }) => {
	// Hooks
	const [, setProductId] = useContext(ProductContext)
	const [product, setProduct] = useState(
		editProduct || {
			name: '',
			price: '',
			image: '',
		}
	)
	const [sending, setSending] = useBoolean()
	//Variables
	const formRef = useRef()
	const toast = useToast()

	// Functions
	const handleChange = e => {
		const { value } = e.target
		const { name } = e.target
		if (name === 'name') {
			setProduct(obj => ({ ...obj, name: value }))
		}
		if (name === 'price') {
			setProduct(obj => ({ ...obj, price: value }))
		}
		if (name === 'image') {
			setProduct(obj => ({ ...obj, image: value }))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setSending.on()
		try {
			if (action === 'edit') {
				await axios.put('/api/products/' + product._id, product)
			} else {
				await axios.post('/api/products', product)
			}
			const toastMessage = {
				title: `${action === 'edit' ? 'Product saved.' : 'Product Created.'}`,
				description: `We've updated ${product.name} for you.`,
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top',
				variant: 'subtle',
			}
			setProductId(product._id)
			toast(toastMessage)
			setSending.off()
			setProduct(obj => ({ ...obj, name: '', price: '', image: '' }))
			onClose()
		} catch (err) {
			const errMessage = {
				title: 'An error occurred.',
				description: `Unable to create product. ${err.message}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top',
				variant: 'subtle',
			}
			toast(errMessage)
			setSending.off()
		}
	}

	return (
		<Container>
			<Grid
				gap={10}
				borderRadius={7}
				mt={10}
				as={'form'}
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<FormControl isRequired>
					<FormLabel>Product Name</FormLabel>
					<Input
						bg={'gray.300'}
						color={'gray.900'}
						onChange={handleChange}
						value={product.name}
						name='name'
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Price</FormLabel>
					<Input
						bg={'gray.300'}
						color={'gray.900'}
						value={product.price}
						onChange={handleChange}
						name='price'
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Image URL</FormLabel>
					<Input
						bg={'gray.300'}
						color={'gray.900'}
						type='url'
						value={product.image}
						onChange={handleChange}
						name='image'
					/>
				</FormControl>
				<Button
					type='submit'
					isLoading={sending}
					loadingText={action === 'edit' ? 'Saving' : 'Adding Product'}
				>
					{action === 'edit' ? 'Save' : 'Add Product'}
				</Button>
			</Grid>
		</Container>
	)
}

Create.propTypes = {
	editProduct: PropTypes.object,
	action: PropTypes.string,
	onClose: PropTypes.func,
}

export default Create
