<template>
    <div class="content-container">
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.fullPath"></component>
            </keep-alive>
            <!-- <keep-alive v-if="keepAlive" :include="usePermissionStore().cachePageList">
                        <component :is="Component"></component>
                    </keep-alive>
                    <component v-else :is="Component"></component> -->
        </router-view>
    </div>

</template>

<script lang="ts" setup>
import { usePermissionStore } from '@/store/modules/permission';
import { NLayoutContent, NScrollbar } from "naive-ui"

const keepAlive = ref(true)

</script>

<style scoped lang="scss">
.content-container{
    width: 100%;
}
</style>