<script lang="ts" setup>
import { searchSiteName } from '@/api';
import { useBoolean } from '@/hooks/common';
import SelectInput from './selectInput.vue';

function useRefArray(params?: []) {
  const arr = Array.isArray(params) && params.length > 0 ? ref(params) : ref([]);
  function clear() {
    arr.value.length = 0;
  }
  function setValue(value) {
    clear();
    if (Array.isArray(value)) {
      arr.value = value;
    } else arr.value.push(value);
  }
  return { arr, setValue, clear };
}
const { bool: siteNameLoading, toggle: toggleSiteNameLoading } = useBoolean(false);
const siteID = ref('');
const { arr: selectorOptions, setValue: setOptionsValue, clear: clearOptions } = useRefArray();
const handleChecked = e => {
  clearOptions();
  siteID.value = e;
};

const debouncedFn = useDebounceFn(async e => {
  toggleSiteNameLoading();
  const site = await searchSiteName(e);
  toggleSiteNameLoading();
  if (site) {
    clearOptions();
    site.forEach(name => {
      selectorOptions.value.push({ label: name.name, value: name._id });
    });
  }
}, 1000);

const handleSearch = (e: string) => {
  if (e) {
    debouncedFn(e);
  } else {
    clearOptions();
  }
};
</script>
<template>
  <n-form label-width="auto">
    <select-input
      :options="selectorOptions"
      :value="siteID"
      :loading="siteNameLoading"
      label="网站名称："
      is-slot
      clear
      @search-value="handleSearch"
      @check-value="handleChecked"
      @clear-option="clearOptions()"
      @slot-click="setOptionsValue"
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
