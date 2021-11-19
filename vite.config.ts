import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// export default ({ mode }) => {
// 	console.log(loadEnv(mode, process.cwd()))
// 	return defineConfig({})
// })

export default defineConfig({
	base: './',
	plugins: [vue(), vueJsx],
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
			},
		},
	},
	define: {
		'process.env': {},
	},
	// build: {
	// 	chunkSizeWarningLimit: 1500,
	// },
})
