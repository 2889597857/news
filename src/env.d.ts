declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_TITLE: string
	readonly VITE_BASE_CONFIG: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
