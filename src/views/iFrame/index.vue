<template>
  <iframe :src="route.query.url"></iframe>
</template>
<script lang="ts" setup>
const route = useRoute();
</script>
<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>
