<template>
  <div
    class="layout-sider h-full dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
  >
    <global-logo :show-title="showTitle" />
    <n-menu :options="route.menus" />
    <!-- <SidebarItem /> -->
  </div>
</template>
<script setup lang="ts">
import { useRouteStore } from '@/store';
import GlobalLogo from '../GlobalLogo/index.vue';

const route = useRouteStore();
const showTitle = ref(true);
</script>

<style lang="scss" scoped>
.layout-sider {
  width: 100%;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
