import type { App } from 'vue'
import { createPinia } from 'pinia'
const store = createPinia()

export function setupStore(app: App<Element>) {
	app.use(store)
}
console.log(typeof store)

window.addEventListener('beforeunload', e => {
	// sessionStorage.setItem('store', JSON.stringify(store))
})
export { store }
