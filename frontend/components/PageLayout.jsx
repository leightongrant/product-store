import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { createContext } from 'react'

export const ProductContext = createContext('')

const PageLayout = () => {
	const [productId, setProductId] = useState('')
	const bg = useColorModeValue('gray.300', 'gray.900')
	return (
		<ProductContext.Provider value={[productId, setProductId]}>
			<Grid minH='100dvh' gridTemplateRows='auto 1fr auto' bg={bg}>
				<GridItem as='header'>
					<Navbar />
				</GridItem>
				<GridItem as='main'>
					<Outlet />
				</GridItem>
				<GridItem as='footer'>
					<Footer />
				</GridItem>
			</Grid>
		</ProductContext.Provider>
	)
}

export default PageLayout
