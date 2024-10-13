import { create } from 'zustand'
import axios from 'axios'

export const useProductStore = create(set => ({
	data: null,
	getData: async () => {
		const res = await axios.get('http://localhost:8000/api/products')
		set(() => ({ data: res.data }))
	},
}))
