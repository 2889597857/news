<template>
  <h1 ref="domRef">登录</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const domRef = ref<HTMLElement | null>(null);
</script>

<style lang="scss" scoped></style>
