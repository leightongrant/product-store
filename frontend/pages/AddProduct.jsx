import { Heading, Button, Center, Container } from '@chakra-ui/react'
import Create from '../components/Create'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
	const navigate = useNavigate()
	return (
		<Container maxW='container.xl' py={'8em'}>
			<SignedIn>
				<Create />
			</SignedIn>
			<SignedOut>
				<Center>
					<Heading>Please sign in to add product</Heading>
				</Center>

				<Center>
					<Button onClick={() => navigate('/login')}>Sign In</Button>
				</Center>
			</SignedOut>
		</Container>
	)
}

export default AddProduct
