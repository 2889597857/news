<template>
  <router-link to="/" class="flex-center w-full nowrap-hidden">
    <img style="width: 30px" src="@/assets/logo.png" />
    <h2 v-show="showTitle" class="pl-8px text-25px font-bold text-primary transition duration-300 ease-in-out">
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useAppInfo } from '@/composables';
import { useThemeStore } from '@/store';

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}
const themeStore = useThemeStore();

defineProps<Props>();

const { title } = useAppInfo();
</script>

<style lang="scss" scoped></style>
