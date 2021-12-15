import { defineConfig } from 'vite'
import { viteEnv, plugins, define } from './build'
export default defineConfig({
	base: viteEnv.VITE_BASE_URL,
	plugins,
	define,
	resolve: {
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
		},
	},
	server: {
		host: '0.0.0.0',
		open: true, // 自动打开浏览器
		cors: true,
		proxy: {},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "./src/styles/global.scss";',
				charset: false,
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 1500,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // 生产环境去除console
				drop_debugger: true, // 生产环境去除debugger
			},
		},
	},
})
