import { defineStore } from 'pinia'
import { store } from '@/store'

export const usePermissionStore = defineStore({
	id: 'permission',
	state: () => ({
		router: '123',
	}),
	actions: {},
	getters: {},
})

export const usePermissionStoreHook = () => usePermissionStore(store)
