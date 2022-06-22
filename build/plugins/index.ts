import autoComponents from './autoComponents';
import autoImport from './autoImport';
import configHtmlPlugin from './html';
import unocss from './unocss';
import vue from './vue';
// import iconify from './iconify';
import visualizer from './visualizer';

// const plugins = [vue, ...html, ...iconify, windicss, visualizer];
export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean): any[] {
  return [...vue, visualizer, autoImport, autoComponents, unocss, configHtmlPlugin(viteEnv, isBuild)];
}
