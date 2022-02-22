<template>
    <n-layout>
        <div class="a">
            <global-side />
            <n-layout>
                <global-header />
                <global-content />
            </n-layout>
        </div>
    </n-layout>
</template>
<script lang="ts"  setup>
import { NLayout } from "naive-ui";
import { GlobalContent, GlobalSide, GlobalHeader } from './components';
</script>
<style scoped lang="scss">
.a {
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>

