import {
	Heading,
	Card,
	CardBody,
	Image,
	Stack,
	Text,
	Divider,
	CardFooter,
	ButtonGroup,
	Spacer,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ProductModal from './ProductModal'
import { SignedIn } from '@clerk/clerk-react'
import { IoMdCreate } from 'react-icons/io'
import AlertDiag from './AlertDiag'

const ProductCard = ({ product }) => {
	return (
		<Card
			p={1}
			_hover={{
				transform: 'translateY(-5px)',
				cursor: 'pointer',
				transition: 'linear .2s',
			}}
			boxShadow='dark-lg'
		>
			<CardBody>
				<Image
					src={product.image}
					alt={product.name}
					borderRadius='lg'
					h={'200px'}
					width={'100%'}
					objectFit='cover'
				/>

				<Stack mt='6' spacing='3'>
					<Heading size='md'>{product.name}</Heading>

					<Text color='blue.600' fontSize='2xl'>
						{`£${product.price}`}
					</Text>
				</Stack>
			</CardBody>

			<SignedIn>
				<Divider />
				<CardFooter>
					<Spacer />
					<ButtonGroup spacing='2'>
						<ProductModal
							action={'edit'}
							product={product}
							ButtonIcon={<IoMdCreate />}
						/>
						<AlertDiag product={product} />
					</ButtonGroup>
				</CardFooter>
			</SignedIn>
		</Card>
	)
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
}

export default ProductCard
