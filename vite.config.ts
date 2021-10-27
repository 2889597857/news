import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	plugins: [vue(), vueJsx],
	resolve: {
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
		},
	},
	server: {
		open: true, // 自动打开浏览器
		proxy: {},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "./src/styles/global.scss";',
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 1500,
	},
})
