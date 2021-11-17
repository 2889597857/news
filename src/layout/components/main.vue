<template>
    <router-view>
        <!-- <transition>
            <keep-alive v-if="keepAlive">
                <component :is></component>
            </keep-alive>
        </transition>-->
    </router-view>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue';
const keepAlive: Ref<Boolean> = ref(false)
</script>