<template>
    <n-layout-sider>
        <logo />
        <SidebarItem />
    </n-layout-sider>
</template>
<script lang="ts">
export default {
    name: "SideBar"
}
</script>
<script setup lang='ts'>
import { NLayoutSider } from "naive-ui";
import Logo from '../GlobalLogo/index.vue';
import SidebarItem from './components/sidebarItem.vue';
</script>

<style lang="scss" scoped>
</style>
