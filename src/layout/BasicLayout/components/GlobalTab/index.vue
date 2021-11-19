<template>
    <h5>tab</h5>
</template>
<script setup lang="ts">
import { RouteConfigs } from '@/layout/BasicLayout/layout';
import { emitter } from '@/utils/mitt';
import { computed, ComputedRef } from 'vue';

//  接收侧边栏切换传递过来的参数
emitter.on("changLayoutRoute", ({ indexPath, parentPath }) => {
    console.log(indexPath, parentPath);

    dynamicRouteTag(indexPath, parentPath);
    setTimeout(() => {
        showMenuModel(indexPath);
    });
});

const dynamicTagList: ComputedRef<Array<RouteConfigs>> = computed(() => {
    return relativeStorage?.routesInStorage;
});

let relativeStorage
function dynamicRouteTag(indexPath: any, parentPath: any) {

}

function showMenuModel(indexPath: any) {
}
</script>