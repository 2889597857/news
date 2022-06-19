<template>
  <div class="layout-sider">
    <global-logo />
    <SidebarItem />
  </div>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import GlobalLogo from '../GlobalLogo/index.vue';
import SidebarItem from './components/sidebarItem.vue';
</script>

<style lang="scss" scoped>
.layout-sider {
  width: 100%;
}
</style>
