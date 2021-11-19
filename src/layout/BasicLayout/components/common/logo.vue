<template>
    <img src="@/assets/logo.png" />
    <p>{{ name }}</p>
</template>

<script setup lang='ts'>
const name = import.meta.env.VITE_APP_NAME
</script>

<style lang="scss" scoped>
</style>
