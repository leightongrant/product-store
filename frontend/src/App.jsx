import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import PageLayout from '../components/PageLayout'
import Login from '../pages/Login'
import User from '../pages/User'
import PageNotFound from '../pages/PageNotFound'
import AddProduct from '../pages/AddProduct'

function App() {
	const router = createBrowserRouter([
		{
			element: <PageLayout />,
			children: [
				{ path: '/', element: <Home /> },
				{
					path: '/add-product',
					element: <AddProduct />,
				},
				{
					path: '/user',
					element: <User />,
				},
				{
					path: '/login',
					element: <Login />,
					children: [{ path: 'factor-one', element: <Outlet /> }],
				},
				{
					path: '/*',
					element: <PageNotFound />,
				},
			],
		},
	])

	return <RouterProvider router={router} />
}

export default App
