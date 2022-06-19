<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NScrollbar, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { usePermissionStore } from '@/store';
import { GlobalMenuOption } from '@/router/router';

const router = useRouter();
const route = useRoute();
const activeKey = computed(() => route.name as string);
const expandedKeys = ref<string[]>(getExpendedKeys());

const menus = usePermissionStore().wholeRoutes;

function getExpendedKeys() {
  const keys: string[] = [];
  route.matched.forEach(item => {
    if (item.children && item.children.length) {
      keys.push(item.name as string);
    }
  });
  return keys;
}
/**
 * 页面跳转
 * @param key 选中菜单项的 key
 * @param item 是菜单项原始数据
 */
function handleUpdateMenu(key: string, item: MenuOption) {
  const menuItem = item as GlobalMenuOption;
  router.push(menuItem.routePath);
}
/**
 * @param key 展开菜单项的 key 的数组
 */
function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}
watch(
  () => route.name,
  () => {
    expandedKeys.value = getExpendedKeys();
  }
);
</script>

<template>
  <div class="a">
    <n-scrollbar>
      <n-menu
        :value="activeKey"
        :options="menus"
        :expanded-keys="expandedKeys"
        :indent="18"
        @update:value="handleUpdateMenu"
        @update:expanded-keys="handleUpdateExpandedKeys"
      >
      </n-menu>
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.a {
  font-size: 20px;
  font-weight: bold;
}
</style>
