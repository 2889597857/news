import autoComponents from './autoComponents';
import autoImport from './autoImport';
import defineOptions from './defineOptions';
import configHtmlPlugin from './html';
import icon from './icon';
import unocss from './unocss';
import visualizer from './visualizer';
import vue from './vue';

// const plugins = [vue, ...html, ...iconify, windicss, visualizer];
export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, srcPath: string): any[] {
  return [
    ...vue,
    visualizer,
    icon(srcPath),
    defineOptions,
    autoImport,
    autoComponents,
    unocss,
    configHtmlPlugin(viteEnv, isBuild)
  ];
}
