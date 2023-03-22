<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" :appear="true">
      <keep-alive :include="['about', 'b']">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>

  <!-- <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" :appear="true">
      <keep-alive :include="['about', 'b']">
        <component
          :is="Component"
          :key="route.fullPath"
          :class="{ 'p-16px': true }"
          class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
        />
      </keep-alive>
    </transition>
  </router-view> -->
</template>

<script lang="ts" setup>
// import { usePermissionStore } from '@/store/modules/permission';
</script>
