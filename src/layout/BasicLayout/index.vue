<template>
    <n-layout>
        <global-side />
        <div class="flex-1-hidden flex h-full">
            <global-content />
        </div>
    </n-layout>
</template>
<script lang="ts"  setup>
import { NLayout } from "naive-ui";
import { GlobalContent } from './components';
import { GlobalSide } from './components';
</script>
<style scoped lang="scss">
</style>

