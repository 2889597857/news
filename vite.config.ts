import { defineConfig, loadEnv } from 'vite';
import { createVitePlugins } from './build';

/**
 * command: serve/build
 * mode：development/production
 */
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const isBuild = command === 'build';
  const env = loadEnv(mode, root);
  const srcPath = `${root}/src`;

  return {
    root,
    base: './',
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname
      }
    },
    plugins: createVitePlugins(env, isBuild, srcPath),
    server: {
      host: '0.0.0.0',
      open: true, // 自动打开浏览器
      cors: true,
      proxy: {
        '/api': {
          target: 'https://www.whcss.xyz/api/newsCrawler/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/global.scss";',
          charset: false
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true // 生产环境去除debugger
        }
      }
    }
  };
});
