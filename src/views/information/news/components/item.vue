<template>
  <div class="news-item">
    <div v-if="menu" class="news-menu">
      <n-button :loading="loading.report" size="small" type="primary" @click="reportNews">报送</n-button>
      <n-button :loading="loading.delete" size="small" type="error" @click="deleteNews">删除</n-button>
    </div>
    <ul class="news-content">
      <li>{{ id + 1 }}、标题：{{ newsInfo.title }}</li>
      <li style="word-wrap: break-word">
        链接：
        <a :href="newsInfo.url" target="_blank" class="news-url">{{ newsInfo.url }}</a>
      </li>
      <li>摘要：{{ newsInfo.report }}</li>
      <li>时间：{{ dayjs(newsInfo.time).format('YYYY-MM-DD HH:mm') }}</li>
    </ul>
  </div>
  <n-divider />
</template>
<script lang="ts" setup>
import { useChangeNewsStateHook } from '@/hooks';
import { useReportStore } from '@/store';
import dayjs from 'dayjs';

const reportStore = useReportStore();
const { changeNewsState } = useChangeNewsStateHook(reportStore);

const props = defineProps<{
  newsInfo: NEWS.NewsItem;
  id: number;
  menu: boolean;
}>();

const emit = defineEmits(['reportNews']);

const loading = reactive({
  content: false,
  report: false,
  delete: false
});

const reportNews = async () => {
  if (!loading.report) {
    loading.report = true;
    await changeNewsState(props.newsInfo);
    emit('reportNews');
    loading.report = false;
  }
};

const deleteNews = async () => {
  if (!loading.delete) {
    loading.delete = true;
    await changeNewsState(props.newsInfo, 2);
    emit('reportNews');
    loading.delete = false;
  }
};
</script>

<style scoped>
.news-menu {
  font-size: 14px;
}

.news-menu {
  display: flex;
  align-items: center;
}
</style>
