<template>
  <div class="admins-layout">
    <aside :style="{ width: state.sider.width + 'px' }" :inlist="a" class="global-side-container">
      <global-side />
    </aside>
    <header class="global-header-container" :style="{ paddingLeft: state.sider.width + 'px' }">
      <global-header />
    </header>
    <div class="global-tab-container" :style="{ paddingLeft: state.sider.width + 'px' }">
      <global-tab />
    </div>
    <main class="global-content-container" :style="{ paddingLeft: state.sider.width + 'px' }">
      <global-content />
    </main>
    <setting-drawer />
  </div>
</template>
<script lang="ts" setup>
import { GlobalContent, GlobalHeader, GlobalSide, GlobalTab, SettingDrawer } from '../common';

// type position = 'absolute' | 'static';

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
}

.global-header-container {
}

.global-side-container {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
