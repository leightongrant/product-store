import { UserProfile, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Center, Container, Heading, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
function User() {
	const navigate = useNavigate()
	return (
		<Container maxW='container.xl' py={'8em'}>
			<SignedIn>
				<UserProfile />
			</SignedIn>
			<SignedOut>
				<Center>
					<Heading>Please sign in to see your profile</Heading>
				</Center>

				<Center>
					<Button onClick={() => navigate('/login')}>Sign In</Button>
				</Center>
			</SignedOut>
		</Container>
	)
}

export default User
