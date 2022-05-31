import autoImport from "unplugin-auto-import/vite";
export default autoImport({
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],
  imports: ["vue", "vue-router", "pinia"],
  dts: "src/auto-import.d.ts",
});
