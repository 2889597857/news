<template>
  <n-pagination v-model:page="page" :page-count="100" />
  <n-scrollbar style="height: 100%" trigger="hover">
    <new-item
      v-for="(item, index) in newsList"
      :id="index"
      :key="item.title"
      :news-info="item"
      @update-news="updateNews"
    />
    <div class="news"></div>
  </n-scrollbar>
</template>
<script setup lang="ts">
import { getNews, updateNews as update } from '@/api';
import newItem from './components/new_item.vue';
import { newsLists } from './news.d';

const newsList = ref<newsLists>();
const page = ref(10);

const updateNews = async (data: { index: number; content: string }) => {
  const { index, content, _id } = data;
  await update();
  // const item: news = newItem.value[index];
  // item.report = content;
};
onMounted(() => {
  getNews().then((result: newsLists) => {
    newsList.value = result;
  });
});
</script>
<style scoped lang="scss">
h1 {
  color: $color-primary;
  font-size: $font-size;
}
</style>
