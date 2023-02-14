<template>
  <div class="global-header flex-y-center h-full">
    <menu-collapse />
    <global-breadcrumb />
  </div>
</template>
<script lang="ts" setup>
import { GlobalBreadcrumb, MenuCollapse } from './components';
</script>
<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
