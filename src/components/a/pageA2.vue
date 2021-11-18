<template>
    <h1>a2</h1>
    <input type="text" v-model="a" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const a = ref('123')
</script>
<script lang="ts">
export default {
    name: "PageA2"
};
</script>