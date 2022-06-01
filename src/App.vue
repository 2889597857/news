<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
let b = reactive({
  a: 23231
})
console.log(import.meta.env);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  {{ b.a }}
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  p {
    color: $color-primary;
    font-size: $font-size;
  }
}
</style>
