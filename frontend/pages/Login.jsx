import { SignIn } from '@clerk/clerk-react'
import { Container, Center } from '@chakra-ui/react'

const Login = () => {
	return (
		<Container py={'4em'}>
			<Center>
				<SignIn
					path='/login'
					forceRedirectUrl={'/user'}
					appearance={{
						elements: {
							footerAction: { display: 'none' },
						},
					}}
				/>
			</Center>
		</Container>
	)
}

export default Login
