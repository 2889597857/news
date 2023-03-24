<template>
  <div class="flex-col wh-full">
    <aside class="fixed left-0 top-0 h-full global-transition" :style="{ width: currentSiderWidth + 'px' }">
      <global-side />
    </aside>
    <header class="fixed top-0 w-full h-56px global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-header />
    </header>
    <div
      class="fixed top-56px w-full h-44px global-tab-container global-transition"
      :style="{ paddingLeft: currentSiderWidth + 'px' }"
    >
      <global-tab />
    </div>
    <main class="wh-full mt-100px overflow-y-auto global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-content ref="el" />
      <n-back-top bottom="50" />
    </main>
    <setting-drawer />
  </div>
</template>
<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store';
import { GlobalContent, GlobalHeader, GlobalSide, GlobalTab, SettingDrawer } from '../common';

const appStore = useAppStore();
const themeStore = useThemeStore();

const currentSiderWidth = computed(() => {
  const width = appStore.siderCollapse ? themeStore.sider.collapsedWidth : themeStore.sider.width;
  return width;
});

const el = ref<HTMLElement | null>(null);
const { isFullscreen, enter } = useFullscreen(el);

watch(
  () => appStore.contentFull,
  value => {
    if (value && !isFullscreen) enter();
  }
);
</script>
<style scoped lang="scss">
.global-transition {
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

main::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
main::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border-radius: 8px;
}
main::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
}
</style>
