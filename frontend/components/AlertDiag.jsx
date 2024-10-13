import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { MdDelete } from 'react-icons/md'
import { useContext } from 'react'
import { ProductContext } from './PageLayout'

const AlertDiag = ({ product }) => {
	const [, setProductId] = useContext(ProductContext)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()
	const toast = useToast()

	const handleDelete = async () => {
		try {
			await axios.delete('/api/products/' + product._id)
			const toastMessage = {
				title: `Product deleted.`,
				description: `${product.name} has been deleted!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top',
				variant: 'subtle',
			}
			toast(toastMessage)
			setProductId(product._id)
		} catch (err) {
			console.log(err.message)
			const errMessage = {
				title: 'An error occurred.',
				description: `Unable to delete product. ${err.message}`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
				variant: 'subtle',
			}
			toast(errMessage)
		}
	}

	return (
		<>
			<Button onClick={onOpen}>
				<MdDelete />
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Product
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure?</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={handleDelete} ml={3}>
								Yes
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

AlertDiag.propTypes = {
	product: PropTypes.object,
}

export default AlertDiag
