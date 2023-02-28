<script lang="ts" setup>

const listItem: {
  url: string;
  selector?: string;
} = {
  url: '',
  selector: ''
};
const site = ref({
  siteName: '',
  siteUrl: '',
  defaultListSelector: '',
  newsList: []
});
const a1 = ref('');
const options = [
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: "You Won't See",
    value: 'song3',
    disabled: true
  }
];
const handleSearch = () => site.value.newsList.push(listItem.url);

const siteInfo = reactive({
  _id: '',
  name: '',
  url: '',
  linkSelector: {
    default: true,
    selector: ''
  },
  contentSelector: {
    title: '',
    time: '',
    content: ''
  }
});
// eslint-disable-next-line no-underscore-dangle
const isNewSite = computed(() => Boolean(siteInfo._id));
</script>
<template>
  <n-form label-width="auto">
    <n-form-item label="网站名称：" path="siteName">
      <n-select v-model:value="a1" :options="options" remote @search="handleSearch">
        <template #action> 如果你点开了这个例子，你可能需要它 </template>
      </n-select>
    </n-form-item>
    {{ isNewSite }}
    <n-form-item label="网站链接：" path="siteUrl">
      <n-input v-model:value="site.siteUrl" placeholder="请输入链接" />
    </n-form-item>
    <n-form-item label="默认链接选择器：" path="defaultListSelector">
      <n-input v-model:value="site.defaultListSelector" placeholder="请输入默认链接选择器" />
    </n-form-item>
  </n-form>
</template>
