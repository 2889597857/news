<template>
  <div class="admins-layout">
    <aside class="global-side-container global-transition" :style="{ width: currentSiderWidth + 'px' }">
      <global-side />
    </aside>
    <header class="global-header-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-header />
    </header>
    <div class="global-tab-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-tab />
    </div>
    <main class="global-content-container global-transition" :style="{ paddingLeft: currentSiderWidth + 'px' }">
      <global-content />
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

const state = reactive({
  sider: {
    width: 220
  },
  header: {
    height: 60
  },
  tab: {
    height: 50
  }
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
}

.global-header-container {
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
