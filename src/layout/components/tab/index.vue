<template>
    <h5>tab</h5>
</template>
<script setup lang="ts">
import { emitter } from '@/utils/mitt';

//  接收侧边栏切换传递过来的参数
emitter.on("changLayoutRoute", ({ indexPath, parentPath }) => {
    console.log(indexPath, parentPath);

    dynamicRouteTag(indexPath, parentPath);
    setTimeout(() => {
        showMenuModel(indexPath);
    });
});


function dynamicRouteTag(indexPath: any, parentPath: any) {

}

function showMenuModel(indexPath: any) {
}
</script>