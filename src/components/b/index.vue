<template>
    <h1>b1</h1>
    <input type="text" v-model="a" />
</template>
<script setup lang="ts">

import { ref } from 'vue';
let a = ref('123')

</script>
<script lang="ts">
export default {
    name: "PageB"
};
</script>