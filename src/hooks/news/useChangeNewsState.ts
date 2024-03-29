/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { getReportNewsCount, updateNewsState } from '@/api';
import { useMessage } from 'naive-ui';
import { ref, Ref } from 'vue';

export default function useChangeNewsStateHook(store, showModal?: Ref<boolean>) {
  const changeLoading: Ref<boolean> = ref(false);
  const reportStore = store;
  const message = useMessage();

  async function getCount() {
    const res = await getReportNewsCount();
    if (res) reportStore.addReport(res);
    if (showModal) showModal.value = false;
  }

  async function changeNewsState(news: NEWS.NewsItem, state = 1) {
    if (!changeLoading.value) {
      changeLoading.value = true;
      const data = await updateNewsState({ _id: news._id, state });
      switch (data.state) {
        case 1:
          await getCount();
          message.success('添加成功', {
            keepAliveOnHover: true
          });
          break;

        case 2:
          message.error('已删除', {
            keepAliveOnHover: true
          });
          break;

        case 3:
          await getCount();
          message.success('已报送', {
            keepAliveOnHover: true
          });
          news.state = 1;
          break;

        default:
          break;
      }
      changeLoading.value = false;
    }
  }
  return {
    changeLoading,
    changeNewsState
  };
}
