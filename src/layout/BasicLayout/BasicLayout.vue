<template>
  <div class="flex-col wh-full">
    <aside
      v-show="!appStore.contentFull"
      class="fixed left-0 top-0 h-full global-transition"
      :style="{ width: currentSiderWidth }"
    >
      <global-side />
    </aside>
    <header
      v-show="!appStore.contentFull"
      class="fixed top-0 w-full h-56px global-transition"
      :style="{ paddingLeft: currentSiderWidth }"
    >
      <global-header />
    </header>
    <div
      v-show="!appStore.contentFull"
      class="fixed top-56px w-full h-44px global-tab-container global-transition"
      :style="{ paddingLeft: currentSiderWidth }"
    >
      <global-tab />
    </div>
    <main class="wh-full overflow-y-auto global-transition" :class="{ 'content-full': !appStore.contentFull }">
      <global-content />
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
  return `${width}px`;
});
</script>
<style scoped lang="scss">
.global-transition {
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.content-full {
  margin-top: 100px;
  padding-left: v-bind(currentSiderWidth);
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
