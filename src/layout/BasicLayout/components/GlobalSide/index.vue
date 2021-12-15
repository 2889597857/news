<template>
    <div style="width: 30%;">
        <logo />
        <SidebarItem />
    </div>
</template>
<script lang="ts">
export default {
    name: "SideBar"
}
</script>
<script setup lang='ts'>
import Logo from '../common/logo.vue';
import SidebarItem from './components/sidebarItem.vue';

// const useRouer = usePermissionStore()
// const route = useRoute()
// const router = useRouter().options.routes;
// // 获取当前激活的菜单
// const activeMenu = computed(() => {
//     const { meta, path } = route;
//     if (meta.activeMenu) {
//         // @ts-ignore
//         return meta.activeMenu;
//     }
//     return path;
// })
// const menuSelect = (indexPath: string): void => {
//     let parentPath = "";
//     let parentPathIndex = indexPath.lastIndexOf("/");
//     if (parentPathIndex > 0) {
//         parentPath = indexPath.slice(0, parentPathIndex);
//     }
//     /**
//      * 找到当前路由的信息
//      */
//     function findCurrentRoute(routes) {
//         return routes.map(item => {
//             if (item.path === indexPath) {
//                 // 切换左侧菜单 通知标签页
//                 emitter.emit("changLayoutRoute", {
//                     indexPath,
//                     parentPath
//                 });
//             } else {
//                 if (item.children) findCurrentRoute(item.children);
//             }
//         });
//     }
//     findCurrentRoute(increaseIndexes(router));
// };
</script>

<style lang="scss" scoped>
</style>
