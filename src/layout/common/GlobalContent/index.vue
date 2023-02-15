<template>
  <div class="content-container p-16px h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out">
    <n-scrollbar>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
        <!-- <keep-alive v-if="keepAlive" :include="usePermissionStore().cachePageList">
                        <component :is="Component"></component>
                    </keep-alive>
                    <component v-else :is="Component"></component> -->
      </router-view>
      <n-back-top bottom="50" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
// import { usePermissionStore } from '@/store/modules/permission';

// const keepAlive = ref(true);
</script>

<style scoped lang="scss">
.content-container {
  width: 100%;
}
</style>
