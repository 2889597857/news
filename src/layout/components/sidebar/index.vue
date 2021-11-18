<template>
    <el-scrollbar>
        <!-- <logo /> -->
        <el-menu :default-active="activeMenu" @select="menuSelect" router>
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
import { useRoute, useRouter } from "vue-router";
import Logo from './logo.vue';
import SidebarItem from './sidebarItem.vue';
import { usePermissionStore } from '@/store/modules/permission';
import { computed } from 'vue-demi';
import { emitter } from "@/utils/mitt";
const useRouer = usePermissionStore()
const route = useRoute()
const router = useRouter().options.routes;
// 获取当前激活的菜单
const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
        // @ts-ignore
        return meta.activeMenu;
    }
    return path;
})
const menuSelect = (indexPath: string): void => {
    let parentPath = "";
    let parentPathIndex = indexPath.lastIndexOf("/");
    console.log(parentPathIndex);

    if (parentPathIndex > 0) {
        parentPath = indexPath.slice(0, parentPathIndex);
    }
    console.log(parentPath);
    // 找到当前路由的信息
    function findCurrentRoute(routes) {
        return routes.map(item => {
            if (item.path === indexPath) {
                // 切换左侧菜单 通知标签页
                emitter.emit("changLayoutRoute", {
                    indexPath,
                    parentPath
                });
            } else {
                if (item.children) findCurrentRoute(item.children);
            }
        });
    }
    findCurrentRoute(router);
};
</script>

<style lang="scss" scoped>
</style>
