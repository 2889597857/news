<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app';
import path from 'path';
import { PropType, ref, computed } from 'vue';
import { childrenType } from '../../layout';

const prop = defineProps({
    item: {
        type: Object as PropType<childrenType>
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ""
    }
})

const onlyOneChild = ref(null)

const hasChildren = (children: childrenType[] = [], parent: childrenType) => {
    try {
        const showingChildren = children.filter((item: any) => {
            onlyOneChild.value = item;
            return true;
        });

        if (showingChildren.length === 1) {
            return true;
        }
        if (showingChildren.length === 0) {
            onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);

    }
}

// 查看路由中是否有多个 children
const hasChild = computed(() => {
    return hasChildren(prop.item.children, prop.item)
})
// 
function resolvePath(routePath) {
    const httpReg = /^http(s?):\/\//;
    if (httpReg.test(routePath)) {
        return prop.basePath + "/" + routePath;
    } else {
        return path.resolve(prop.basePath, routePath);
    }
}

</script>
<template>
    <template v-if="hasChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
        <el-menu-item
            :index="resolvePath(onlyOneChild.path)"
            style="display: flex; align-items: center"
        >
            <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(prop.item.path)">
        <template #title>{{ prop.item.meta.title }}</template>
        <!-- 多个 Children 递归调用自己 -->
        <sidebar-item
            v-for="child in prop.item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
        />
    </el-sub-menu>
</template>
