<script lang="ts" setup>
import { getNewsLists, getReportNews } from '@/api';
import { useReportStore } from '@/store';
import GetNews from '../components/getNews.vue';
import NewsItem from '../components/item.vue';

const page = ref(1);
const pageCount = ref(1);
const newsList = ref([]);
const reportStore = useReportStore();

const getNewsList = (newPage: number) =>
  getNewsLists(newPage).then(res => {
    if (res) {
      page.value = res.currentPage;
      pageCount.value = res.totalPages;
      newsList.value = res.data;
    }
  });
const reportNews = () => getNewsList(page.value);

onMounted(() => {
  getReportNews().then(res => {
    if (res) reportStore.addReport(res);
  });
});

onMounted(() => getNewsList(page.value));

watch(
  () => page.value,
  newPage => getNewsList(newPage)
);
</script>

<template>
  <div class="news">
    <div class="get-news">
      <get-news />
    </div>
    <n-scrollbar>
      <news-item
        v-for="(item, index) in newsList"
        :id="index"
        :key="item._id"
        :menu="true"
        :news-info="item"
        @report-news="reportNews"
      />
    </n-scrollbar>

    <div class="pagination">
      <n-pagination v-model:page="page" size="large" :page-count="pageCount" :page-slot="4" />
    </div>
  </div>
</template>

<style scoped>
.news {
  padding: 10px 10px 10px;
}

.pagination {
  position: fixed;
  width: 100%;
  height: 48px;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
