<template>
  <div
    class="layout-sider h-full dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
  >
    <global-logo :show-title="showTitle" />
    <!-- <SidebarItem /> -->
  </div>
</template>
<script setup lang="ts">
import GlobalLogo from '../GlobalLogo/index.vue';

const showTitle = ref(true);
</script>

<style lang="scss" scoped>
.layout-sider {
  width: 100%;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
