<template>
  <div class="admins-layout">
    <aside class="global-side-container global-transition" :style="{ width: currentSiderWidth + 'px' }">
      <global-side />
    </aside>
    <header class="global-header-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-header />
    </header>
    <div class="global-tab-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <!-- <global-tab /> -->
      <h1>TAB</h1>
    </div>

    <main class="global-content-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-content />
    </main>
    <setting-drawer />
  </div>
</template>
<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store';
import { GlobalContent, GlobalHeader, GlobalSide, SettingDrawer } from '../common';

const appStore = useAppStore();
const themeStore = useThemeStore();

const currentSiderWidth = computed(() => {
  const width = appStore.siderCollapse ? themeStore.sider.collapsedWidth : themeStore.sider.width;
  return width;
});
</script>
<style scoped lang="scss">
.admins-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.global-content-container {
  width: 100%;
  height: 100%;
  margin-top: 90px;
  overflow: hidden;
}

.global-header-container {
  position: fixed;
  height: 56px;
  top: 0;
  width: 100%;
}

.global-tab-container {
  position: fixed;
  top: 56px;
  height: 44px;
  width: 100%;
}

.global-side-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}

.global-transition {
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
</style>
