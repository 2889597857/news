<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useGlobalEvents } from '@/composables';
import { subscribeStore, useThemeStore } from '@/store';
import { dateZhCN, zhCN } from 'naive-ui';

const theme = useThemeStore();
subscribeStore();
useGlobalEvents();
</script>
