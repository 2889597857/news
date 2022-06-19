import { createHtmlPlugin } from 'vite-plugin-html'; // html插件(使用变量、压缩)

export default function configHtmlPlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_APP_TITLE } = viteEnv;
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    /**
     * 需要注入 index.html ejs 模版的数据
     */
    inject: {
      data: {
        title: VITE_APP_TITLE
      }
    }
  });
  return htmlPlugin;
}
