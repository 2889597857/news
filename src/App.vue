<template lang="pug">
router-view
</template>
<script lang="ts" setup>
import { emitter } from '@/utils/mitt';
emitter.on('foo', e => console.log('foo', e))
</script>