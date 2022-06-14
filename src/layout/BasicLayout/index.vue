<template>
    <n-layout has-sider>
        <global-side />
        <global-header />
        <global-content />
    </n-layout>
    <setting-drawer />
</template>
<script lang="ts"  setup>
import { NLayout } from "naive-ui";
import { GlobalContent, GlobalSide, GlobalHeader, SettingDrawer } from '../common';
</script>
<style scoped lang="scss">
.a {
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>

