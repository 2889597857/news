<template>
  <h1>{{ pageName }}</h1>
  <slot></slot>
</template>
<script setup lang="ts">
const pageName = 'pageName';
</script>
