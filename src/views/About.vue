<script lang="ts" setup>
import { emitter } from '@/utils/mitt';

emitter.emit('foo', '123')

</script>
<template>
    <h1>About</h1>
</template>

