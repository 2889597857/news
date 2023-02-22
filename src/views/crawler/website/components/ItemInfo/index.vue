<script lang="ts" setup>
const a = reactive({
  name: '凤凰网安徽',
  url: 'https://ah.ifeng.com',
  state: true,
  defaultListSelector: '.content-2VFX2Hqk > div > ul > li > a',
  newsList: [
    { url: 'https://ah.ifeng.com/shanklist/200-214-216353-', state: true },
    { url: 'https://ah.ifeng.com/shanklist/200-214-216353-216356-', state: true }
  ]
});
watch(
  () => a.state,
  newValue => {
    if (!newValue) {
      // eslint-disable-next-line array-callback-return
      a.newsList.map(news => {
        // eslint-disable-next-line no-param-reassign
        news.state = false;
      });
    }
  }
);
watch(
  () => a.newsList,
  newValue => {
    const res = newValue.some(news => news.state);
    if (!res) a.state = false;
  },
  { deep: true }
);
</script>

<template>
  <n-card>
    <n-space vertical align="start">
      <n-space class="mb-1">
        <a class="text-22px font-medium news-url" style="letter-spacing: 0.1em" target="_blank" :href="a.url">{{
          a.name
        }}</a>
        <n-switch v-model:value="a.state" />
      </n-space>
      <n-space v-for="item in a.newsList" :key="item.url">
        <a class="news-url" target="_blank" :href="a.url">{{ item.url }}</a>
        <n-switch v-model:value="item.state" :disabled="!a.state" />
        <n-button size="small" :disabled="!item.state">测试</n-button>
      </n-space>
      <n-button size="small" dashed type="success">
        添加
        <template #icon>
          <n-icon>
            <svg-icon icon="mdi:access-point-check" />
          </n-icon>
        </template>
      </n-button> </n-space
  ></n-card>
</template>
