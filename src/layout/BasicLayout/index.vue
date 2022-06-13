<template>
    <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
            <global-side />
        </n-layout-sider>
        <n-layout>
            <global-header />
            <global-content />
        </n-layout>
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

