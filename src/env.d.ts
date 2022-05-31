declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 项目标题(文本) */
  readonly VITE_APP_TITLE_LABEL: string;
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 网路请求环境类型 */
  readonly VITE_HTTP_ENV: string;
  /** 网路请求地址 */
  readonly VITE_HTTP_URL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
