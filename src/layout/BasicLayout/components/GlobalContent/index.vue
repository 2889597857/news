<template>
    <div class="flex-1 flex-col-stretch p-16px bg-[#F6F9F8] dark:bg-black">
        <router-view>
            <template #default="{ Component, route }">
                <keep-alive v-if="keepAlive" :include="usePermissionStore().cachePageList">
                    <component :is="Component"></component>
                </keep-alive>
                <component v-else :is="Component"></component>
            </template>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import { usePermissionStore } from '@/store/modules/permission';
import { ref, Ref } from 'vue';
const keepAlive: Ref<Boolean> = ref(true)
</script>