import { defineStore } from 'pinia'
import { store } from '@/store'
interface IApp {
	name: string
	age: number
	score: number
}
export const useAppStore = defineStore({
	id: 'appStore',
	state: (): IApp => ({
		name: '张山',
		age: 123,
		score: 0,
	}),
	actions: {
		changeA() {
			this.score++
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

export const useAppStoreHook = () => useAppStore(store)
