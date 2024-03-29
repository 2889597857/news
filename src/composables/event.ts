import { useTabStore } from '@/store';
import { useEventListener } from '@vueuse/core';

/** 全局事件 */
export function useGlobalEvents() {
  // const theme = useThemeStore();
  const tab = useTabStore();
  /** 页面离开时缓存多页签数据 */
  useEventListener(window, 'beforeunload', () => {
    // theme.cacheThemeSettings();
    tab.cacheTabRoutes();
  });
}
