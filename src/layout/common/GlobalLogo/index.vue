<template>
  <router-link to="/" class="flex-center w-full nowrap-hidden">
    <system-logo class="text-32px text-primary" style="width: 26px; fill: var(--primary-color)" />
    <p v-show="showTitle" class="pl-8px text-25px font-bold text-primary transition duration-300 ease-in-out">
      {{ title }}
    </p>
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
