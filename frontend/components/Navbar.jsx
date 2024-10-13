import { Flex, HStack, Button, Spacer, Text, Link } from '@chakra-ui/react'
import { MdOutlineLightMode, MdOutlineDarkMode, MdAdd } from 'react-icons/md'
import { useColorMode } from '@chakra-ui/react'
import { UserButton, SignedIn } from '@clerk/clerk-react'
import ProductModal from './ProductModal'

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex as='nav' p='4'>
			<Text
				bgGradient='linear(to-r, cyan.400, blue.500)'
				bgClip='text'
				fontSize={{ base: '22', sm: '28' }}
				fontWeight='extrabold'
				textTransform={'uppercase'}
			>
				<Link href='/'>Product Store 🛒</Link>
			</Text>
			<Spacer />
			<HStack>
				<ProductModal ButtonIcon={<MdAdd />} />
				<Button colorScheme='gray' size={'md'} onClick={toggleColorMode}>
					{colorMode === 'dark' ? (
						<MdOutlineLightMode />
					) : (
						<MdOutlineDarkMode />
					)}
				</Button>
				<SignedIn>
					<Button size={'md'}>
						<UserButton />
					</Button>
				</SignedIn>
			</HStack>
		</Flex>
	)
}

export default Navbar
