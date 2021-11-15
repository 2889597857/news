import { defineStore } from 'pinia'
import { store } from '@/store'

export const usePermissionStore = defineStore({
	id: 'appStore',
	state: () => ({
		name: '张山',
		age: 123,
		score: 59,
	}),
	actions: {
		changeA(value: number) {
			this.score = value
		},
	},
	getters: {
		standard() {
			const standard: string = this.score >= 60 ? '及格' : '不及格'
			return standard
		},
		standard1() {
			return (value: string) => `${this.name}+${value}`
		},
	},
})

export const usePermissionStoreHook = () => usePermissionStore(store)
