<template>
  <n-drawer :show="app.settingDrawerVisible" display-directive="show" :width="330" @mask-click="app.closeSettingDrawer">
    <n-drawer-content>
      <h1>Setting</h1>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store';

const app = useAppStore();
</script>

<style scoped lang="scss"></style>
