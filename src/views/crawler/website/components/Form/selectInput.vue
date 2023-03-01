<template>
  <n-form-item :label="label" path="siteName">
    <n-select
      v-model:value="checkedValue"
      filterable
      :options="options"
      :loading="loading"
      clearable
      remote
      @search="handleSearch"
      @blur="onBlur(clear)"
    >
      <template v-if="isSlot" #action>
        <n-button @click="$emit('checkValue', value)">添加新网站</n-button>
      </template>
    </n-select>
  </n-form-item>
</template>

<script lang="ts" setup>
import { SelectOption } from 'naive-ui';

const props = withDefaults(
  defineProps<{
    value: string | null;
    options: SelectOption[];
    loading: boolean;
    label: string;
    isSlot: boolean;
    clear: boolean;
  }>(),
  {
    isSlot: true,
    clear: true
  }
);
const emit = defineEmits(['checkValue', 'searchValue', 'clearOption']);
const checkedValue = computed({
  get: () => props.value,
  set: newVal => emit('checkValue', newVal)
});
const handleSearch = (query: string) => emit('searchValue', query);
const onBlur = clear => {
  if (clear) emit('clearOption');
};
</script>
