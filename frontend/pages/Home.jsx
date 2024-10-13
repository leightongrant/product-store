import ProductCard from '../components/ProductCard'
import {
	Container,
	Heading,
	SimpleGrid,
	Link,
	Center,
	Skeleton,
	SkeletonText,
	Stack,
} from '@chakra-ui/react'
import { IoMdCreate } from 'react-icons/io'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ProductContext } from '../components/PageLayout'

export const Home = () => {
	const [data, setData] = useState('')
	const [isLoading, setIsLoaing] = useState(true)
	const [productId] = useContext(ProductContext)

	const productsLoader = async () => {
		try {
			const res = await axios.get('/api/products')
			if (res.status === 200) {
				if (res.data.length === 0) {
					setData(null)
					return
				}
				setData(res.data)
				setIsLoaing(false)
				return
			}
		} catch (err) {
			setData({ error: true, message: err.message })
		}
	}

	useEffect(() => {
		productsLoader()
	}, [productId])

	const ProductSkeleton = () => {
		return (
			<Stack bg={'gray.800'} p={10} borderRadius={5} gap={5}>
				<Skeleton height={'200px'} width={'100%'} borderRadius={5} />
				<SkeletonText height={'40px'} width={'70%'} />
				<SkeletonText height={'40px'} width={'50%'} />
			</Stack>
		)
	}

	if (isLoading) {
		return (
			<Container maxW='container.xl' py={'8em'}>
				<SimpleGrid columns={[1, null, 2, 4]} spacing={10}>
					<ProductSkeleton key={1} />
					<ProductSkeleton key={2} />
					<ProductSkeleton key={3} />
					<ProductSkeleton key={4} />
				</SimpleGrid>
			</Container>
		)
	}

	if (data.error) {
		return (
			<Container py={'6em'}>
				<Heading textAlign={'center'}>{data.message}</Heading>
			</Container>
		)
	}

	if (!data) {
		return (
			<Container py={'6em'}>
				<Heading textAlign={'center'} as={'h1'}>
					Please add some products to the store{' '}
				</Heading>

				<Center mt={10}>
					<Link href='/create'>
						<IoMdCreate />
					</Link>
				</Center>
			</Container>
		)
	}

	return (
		<Container maxW='container.xl' py='8em'>
			<SimpleGrid columns={[1, null, 2, 4]} spacing={10}>
				{data.map(product => {
					return <ProductCard key={product._id} product={product} />
				})}
			</SimpleGrid>
		</Container>
	)
}
