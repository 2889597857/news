<template></template>
<script setup lang="ts">
import { emitter } from '@/utils/mitt';

//  接收侧边栏切换传递过来的参数
emitter.on("changLayoutRoute", ({ indexPath, parentPath }) => {
    dynamicRouteTag(indexPath, parentPath);
    setTimeout(() => {
        showMenuModel(indexPath);
    });
});


function dynamicRouteTag(indexPath: any, parentPath: any) {
    throw new Error('Function not implemented.');
}

function showMenuModel(indexPath: any) {
    throw new Error('Function not implemented.');
}
</script>