<template>
    <p>{{ a }}</p>
    <p>{{ b.a }}</p>
</template>
<script lang="ts"  setup>
import { reactive, ref, Ref } from 'vue';
import { index } from './index';
import HelloWorld from '@/components/HelloWorld.vue';
const a: Ref<string> = ref('123')
const b: index = reactive({
    a: 123,
    b: '123'
})
</script>
<style></style>