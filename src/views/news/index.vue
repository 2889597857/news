<template>
  <n-pagination v-model:page="page" :page-count="totalPages" />
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
import { getNews } from '@/api';
import newItem from './components/new_item.vue';

const newsList = ref<NEWS.NewsList>();
const page = ref();
const totalPages = ref();
const updateNews = async (data: { index: number; content: string }) => {
  // const { index, content, _id } = data;
  // await update();
  // const item: news = newItem.value[index];
  // item.report = content;
};
onMounted(() => {
  getNews().then(result => {
    page.value = result.currentPage;
    totalPages.value = result.totalPages;
    newsList.value = result.data;
  });
});
</script>
<style scoped lang="scss">
h1 {
  color: $color-primary;
  font-size: $font-size;
}
</style>
