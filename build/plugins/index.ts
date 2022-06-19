import vue from './vue';
import configHtmlPlugin from './html';
import autoImport from './autoImport';
import autoComponents from './autoComponents';
import unocss from './unocss';
// import iconify from './iconify';
// import windicss from './windicss';
import visualizer from './visualizer';

// const plugins = [vue, ...html, ...iconify, windicss, visualizer];
export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean): any[] {
  return [...vue, visualizer, autoImport, autoComponents, unocss, configHtmlPlugin(viteEnv, isBuild)];
}
