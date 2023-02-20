<template>
  <div
    class="layout-sider h-full dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
  >
    <global-logo :style="{ height: themeStore.header.height + 'px' }" :show-title="showTitle" />
    <n-menu
      :collapsed="appStore.siderCollapse"
      :collapsed-width="themeStore.sider.collapsedWidth"
      :options="routeStore.menus"
      :value="activeKey"
      :expanded-keys="expandedKeys"
      :indent="18"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </div>
</template>
<script setup lang="ts">
import { useAppStore, useRouteStore, useThemeStore } from '@/store';
import { getActiveKeyPathsOfMenus } from '@/utils';
import GlobalLogo from '../GlobalLogo/index.vue';

const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const showTitle = computed(() => !appStore.siderCollapse);

const router = useRouter();
const route = useRoute();
const activeKey = computed(() => route.name as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(key: string, item) {
  const menuItem = item;
  router.push(menuItem.routePath);
}
function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, routeStore.menus);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.layout-sider {
  width: 100%;
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
