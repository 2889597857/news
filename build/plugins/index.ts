import autoComponents from './autoComponents';
import autoImport from './autoImport';
import configHtmlPlugin from './html';
import icon from './icon';
import unocss from './unocss';
import visualizer from './visualizer';
import vue from './vue';

// const plugins = [vue, ...html, ...iconify, windicss, visualizer];
export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, srcPath: string): any[] {
  return [...vue, visualizer, autoImport, autoComponents, unocss, icon(srcPath), configHtmlPlugin(viteEnv, isBuild)];
}
