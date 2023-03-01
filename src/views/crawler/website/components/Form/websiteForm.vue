<script lang="ts" setup>
import { searchSiteName } from '@/api';
import { useBoolean } from '@/hooks/common';
import SelectInput from './selectInput.vue';

const { bool: siteNameLoading, toggle: toggleSiteNameLoading } = useBoolean(false);
const siteID = ref('');

const handleChecked = e => {
  console.log(e);
  siteID.value = e;
};
const debouncedFn = useDebounceFn(async () => {
  toggleSiteNameLoading();

  console.log(await searchSiteName('安徽'));
}, 1000);

const siteSelectorOptions = [];
const handleSearch = async e => {
  const data = await debouncedFn();
};
</script>
<template>
  <n-form label-width="auto">
    <select-input
      :options="siteSelectorOptions"
      :checked-site="siteID"
      :loading="siteNameLoading"
      @search-value="handleSearch"
      @check-value="handleChecked"
    />
    <!-- 
    <n-form-item label="网站链接：" path="siteUrl">
      <n-input v-model:value="site.siteUrl" placeholder="请输入链接" />
    </n-form-item>
    <n-form-item label="默认链接选择器：" path="defaultListSelector">
      <n-input v-model:value="site.defaultListSelector" placeholder="请输入默认链接选择器" />
    </n-form-item> -->
  </n-form>
</template>
