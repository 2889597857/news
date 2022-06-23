import autoImport from 'unplugin-auto-import/vite';
// 自动引入方法
export default autoImport({
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/ // .md
  ],
  imports: ['vue', 'vue-router', 'pinia'],
  dts: 'src/type/auto-import.d.ts'
});
