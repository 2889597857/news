import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { useTimeStore } from './timeStore';

type TempTitle = '上午' | '下午';

type Temp = {
  title: TempTitle;
  list: Array<NEWS.NewsItem>;
  count: number;
};
const tempObj = (title: TempTitle): Temp => {
  return {
    title,
    list: [],
    count: 0
  };
};

export const useReportStore = defineStore('report', () => {
  const report: Ref<Array<NEWS.NewsItem>> = ref([]);

  const currentReport = ref({});

  const count = computed(() => report.value.length);

  const list = computed((): Array<Temp> => {
    const timeStore = useTimeStore();

    const afternoon = tempObj('下午');
    const morning = tempObj('上午');

    report.value.forEach((news: NEWS.NewsItem) =>
      timeStore.isAM(news.reportTime) ? morning.list.push(news) : afternoon.list.push(news)
    );

    afternoon.count = morning.list.length;

    return [morning, afternoon];
  });
  function addReport(news: Array<NEWS.NewsItem> | NEWS.NewsItem) {
    if (Array.isArray(news)) {
      report.value = [...news];
    } else {
      report.value.push(news);
    }
  }

  function addCurrentReport(news: NEWS.NewsItem) {
    currentReport.value = news;
  }

  return {
    report,
    count,
    list,
    currentReport,
    addReport,
    addCurrentReport
  };
});
