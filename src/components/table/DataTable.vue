<template>
  <n-data-table :loading="loading" :columns="columns" :data="data" :single-line="false" />
</template>

<script lang="ts" setup>
defineProps<{
  data: object;
  columns: object;
  loading: boolean;
}>();
</script>

<style lang="scss" scoped></style>
