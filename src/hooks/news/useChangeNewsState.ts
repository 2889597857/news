/* eslint-disable no-param-reassign */
import { updateNewsState } from '@/api';
import { useMessage } from 'naive-ui';
import { ref, Ref } from 'vue';

export default function useChangeNewsState(store, showModal?: Ref<boolean>) {
  const changeLoading: Ref<boolean> = ref(false);
  const reportStore = store;
  const message = useMessage();

  async function changeNewsState(news: NEWS.NewsItem, state = 1) {
    if (!changeLoading.value) {
      changeLoading.value = true;
      // eslint-disable-next-line no-underscore-dangle
      const data = await updateNewsState({ _id: news._id, state });
      switch (data.state) {
        case 1:
          reportStore.addReport({
            title: news.title,
            url: news.url,
            report: news.report
          });
          if (showModal) showModal.value = false;
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
