<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" :appear="true">
      <keep-alive :include="['about', 'b']">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
// import { usePermissionStore } from '@/store/modules/permission';
</script>
