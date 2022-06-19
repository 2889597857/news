<template>
  <n-pagination v-model:page="page" :page-count="100" />
  <n-scrollbar style="height: calc(100% - 100px)" trigger="hover">
    <new-item v-for="(item, index) in newsList" :id="index" :key="item.title" :news-info="item" />
    <div class="news"></div>
  </n-scrollbar>
</template>
<script setup lang="ts">
import { getNews } from '@/api';
import newItem from './components/new_item.vue';
import { news, newsLists } from './news.d';


const newsList = ref<newsLists>();
const page = ref(10);

const updateNews = (index: number, content: string) => {
  const item: news = newItem.value[index]

};
let a = "231"
onMounted(() => {
  getNews()
    .then((result: newsLists) => {
      console.log(result);
      newsList.value = result;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>
<style scoped lang="scss">
h1 {
  color: $color-primary;
  font-size: $font-size;
}
</style>
