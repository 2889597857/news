import { visualizer } from 'rollup-plugin-visualizer';
// 打包文件体积分析
export default visualizer({
  open: true,
  gzipSize: true,
  brotliSize: true
});
