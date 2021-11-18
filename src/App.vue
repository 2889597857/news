<template lang="pug">
router-view
</template>
<script lang="ts" setup>
import { emitter } from '@/utils/mitt';
import { getCurrentInstance } from 'vue-demi';
emitter.on('foo', e => console.log('foo', e))
// console.log(getCurrentInstance().appContext.config.globalProperties.$storage)
</script>