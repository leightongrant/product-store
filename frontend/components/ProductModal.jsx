import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import Create from './Create'
import PropTypes from 'prop-types'
import { useSession } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const ProductModal = ({ action, product, ButtonIcon }) => {
	const OverlayOne = () => (
		<ModalOverlay
			bg='grayAlpha'
			backdropFilter='blur(10px) hue-rotate(10deg)'
		/>
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = useState(<OverlayOne />)
	const { isSignedIn } = useSession()
	const navigate = useNavigate()

	return (
		<>
			<Button
				onClick={() => {
					if (isSignedIn) {
						setOverlay(
							<ModalOverlay
								bg='blackAlpha'
								backdropFilter={'blur(5px) hue-rotate(15deg)'}
							/>
						)
						onOpen()
					} else navigate('/login')
				}}
			>
				{ButtonIcon}
			</Button>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>
						{action === 'edit' ? 'Edit Product' : 'Add Product'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Create editProduct={product} action={action} onClose={onClose} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

ProductModal.propTypes = {
	action: PropTypes.string,
	product: PropTypes.object,
	ButtonIcon: PropTypes.object,
}

export default ProductModal
