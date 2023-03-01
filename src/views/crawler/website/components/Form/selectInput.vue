<template>
  <n-form-item label="网站名称：" path="siteName">
    <n-select
      v-model:value="value"
      filterable
      :options="options"
      :loading="loading"
      clearable
      remote
      @search="handleSearch"
    >
      <template #action> 如果你点开了这个例子，你可能需要它 </template>
    </n-select>
  </n-form-item>
</template>

<script lang="ts" setup>
import { SelectOption } from 'naive-ui';

const props = defineProps<{
  options: SelectOption[];
  checkedSite: string;
  loading: boolean;
}>();
const emit = defineEmits(['checkValue', 'searchValue']);
const value = computed({
  get: () => props.checkedSite,
  set: newVal => emit('checkValue', newVal)
});
const handleSearch = (query: string) => emit('searchValue', query);
</script>
