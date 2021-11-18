<template>
    <el-scrollbar>
        <!-- <logo /> -->
        <el-menu router>
            <SidebarItem
                v-for="route in useRouer.wholeRoutes"
                :key="route.path"
                :item="route"
                :base-path="route.path"
            ></SidebarItem>
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts">
export default {
    name: "SideBar"
}
</script>
<script setup lang='ts'>
import Logo from './logo.vue';
import SidebarItem from './sidebarItem.vue';
import { usePermissionStoreHook } from '@/store/modules/permission';
const useRouer = usePermissionStoreHook()
</script>

<style lang="scss" scoped>
</style>
