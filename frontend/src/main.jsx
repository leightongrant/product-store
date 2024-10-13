import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
}
const fonts = {
	brand: {
		serif: 'serif',
	},
}
const config = {
	initialColorMode: 'system',
	useSystemColorMode: true,
}

const theme = extendTheme({ config, colors, fonts })

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{
				baseTheme: [dark],
				variables: {
					colorBackground: 'rgb(26, 32, 44)',
				},
			}}
		>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</ClerkProvider>
	</StrictMode>
)
