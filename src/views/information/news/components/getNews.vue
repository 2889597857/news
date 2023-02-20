<script lang="ts" setup>
import { getNews } from '@/api';
import { useReportStore } from '@/store';
import { useMessage } from 'naive-ui';
import { ref } from 'vue';
import NewsItem from './item.vue';
import reportNewsHook from './report';

const message = useMessage();
const reportStore = useReportStore();

const formRef = ref(null);

const news = ref({
  url: ''
});

const urlReg =
  /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]{2,6})(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;

const rules = {
  url: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入链接');
        }
        if (!urlReg.test(value.trim())) {
          return new Error('请输入合法链接');
        }
        return true;
      },
      trigger: ['blur']
    }
  ]
};

const handleValidateClick = () => {
  formRef.value?.validate(errors => {
    if (!errors) getNewsContent();
  });
};

const modalNews = ref<NEWS.NewsItem>();
const showLoading = ref(false);
const showModal = ref(false);

function getNewsContent() {
  if (!showLoading.value) {
    showLoading.value = true;
    if (news.value.url) {
      getNews(news.value.url.trim())
        .then(res => {
          modalNews.value = res;
          showModal.value = true;
          showLoading.value = false;
        })
        .catch(e => {
          message.error('获取失败', {
            keepAliveOnHover: true
          });
          showLoading.value = false;
        });
    }
  }
  return false;
}

const { reportLoading, changeNewsState } = reportNewsHook(reportStore, showModal);
</script>
<template>
  <n-form ref="formRef" :model="news" :rules="rules">
    <n-space>
      <n-form-item path="url">
        <n-input v-model:value.trim="news.url" clearable autocomplete="“off”" placeholder="请输入链接" />
      </n-form-item>
      <n-button :loading="showLoading" @click="handleValidateClick">获取新闻</n-button>
    </n-space>
  </n-form>
  <n-modal v-model:show="showModal">
    <div class="modal-news">
      <n-space vertical>
        <news-item :id="0" :menu="false" :news-info="modalNews" />
        <n-space>
          <n-button
            :loading="reportLoading"
            :disabled="modalNews.state == 1"
            type="primary"
            @click="changeNewsState(modalNews)"
            >报送</n-button
          >
          <n-button type="error" @click="showModal = false">关闭</n-button>
        </n-space>
      </n-space>
    </div>
  </n-modal>
</template>

<style scoped>
.modal-news {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 60%;
}
</style>
