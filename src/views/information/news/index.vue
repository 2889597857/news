<script lang="ts" setup>
import { getNewsLists, getReportNewsCount } from '@/api';
import { useReportStore } from '@/store';
import DragCount from './components/dragCount.vue';
import GetNews from './components/getNews.vue';
import NewsItem from './components/item.vue';

const reportStore = useReportStore();

const page = ref(1);
const pageCount = ref(1);
const w = reactive({
  x: 300,
  y: 300
});
const newsList = ref([]);

const getNewsList = async (newPage: number) => {
  const res = await getNewsLists(newPage);
  if (res) {
    page.value = res.currentPage;
    pageCount.value = res.totalPages;
    newsList.value = res.data;
  }
};

const getReportCount = () =>
  getReportNewsCount().then(res => {
    if (res) reportStore.count = res as number;
  });
const reportNews = () => getNewsList(page.value);

onMounted(() => {
  getNewsList(page.value);
  getReportCount();
});

watch(
  () => page.value,
  newPage => getNewsList(newPage)
);
</script>

<template>
  <drag-count />
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
