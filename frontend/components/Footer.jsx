import { Flex, HStack, Text } from '@chakra-ui/react'
import { MdCopyright } from 'react-icons/md'

const Footer = () => {
	return (
		<Flex as={'footer'} p={'10px'} bg={'gray.900'} justify={'space-around'}>
			<HStack color={'whitesmoke'}>
				<Text>Copyright </Text>
				<MdCopyright />
				<Text>2024, Product Store Ltd.</Text>
			</HStack>
		</Flex>
	)
}

export default Footer
