<template>
    <n-layout-content>
        <n-scrollbar>
            <router-view>
                <template #default="{ Component, route }">
                    <keep-alive v-if="keepAlive" :include="usePermissionStore().cachePageList">
                        <component :is="Component"></component>
                    </keep-alive>
                    <component v-else :is="Component"></component>
                </template>
            </router-view>
        </n-scrollbar>
    </n-layout-content>
</template>

<script lang="ts" setup>
import { usePermissionStore } from '@/store/modules/permission';
import { NLayoutContent, NScrollbar } from "naive-ui"
import { ref, Ref } from 'vue';
const keepAlive: Ref<Boolean> = ref(true)

</script>