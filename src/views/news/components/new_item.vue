<template>
  <div class="news-item">
    <div class="news-menu">
      <n-button type="primary" @click="editorNewBtn">{{ newsMen }}</n-button>
      <n-button v-show="editorNews" type="tertiary" @click="cancelEditor">取消</n-button>
      <n-space> <n-switch v-model:value="showAll" />显示全文 </n-space>
    </div>
    <ul class="news-content">
      <li>{{ props.id + 1 }}、标题：{{ props.newsInfo.title }}</li>
      <li>
        链接：
        <span class="news-url" @click="gotoDetails">{{ props.newsInfo.url }}</span>
      </li>
      <li v-show="!editorNews">摘要：{{ defaultContent }}</li>
      <n-input
        v-show="editorNews"
        v-model:value="editorValue"
        autosize
        type="textarea"
        placeholder="内容"
        @on-blur="onBlue"
      />
      <li>时间：{{ dayjs(props.newsInfo.time).format('YY-MM-DD hh:mm') }}</li>
      <li class="news-segmentation">
        关键字：
        <n-tag v-for="item in props.newsInfo.segmentation" :key="item" type="info">
          {{ item }}
        </n-tag>
      </li>
    </ul>
    <n-divider />
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

const router = useRouter();
type NewItem = {
  _id: string;
  title: string;
  url: string;
  content: string;
  segmentation: Array<{ keyword: string }>;
  report: string;
  time: string;
};
const props = defineProps<{
  newsInfo: NewItem;
  id: number;
}>();

const emit = defineEmits(['updateNews']);

const onBlue = (): void => {
  console.log(132);
};
// 按钮文字
const newsMen = ref('编辑');
// 编辑新闻
const editorNews = ref(false);
// 编辑新闻内容
const editorValue = ref('');
// 是否显示全文
const showAll = ref(false);
// 默认只显示新闻前两段内容

const defaultContent = ref('');

watchEffect(() => {
  if (showAll.value) {
    // 默认只显示新闻前两段内容
    defaultContent.value = props.newsInfo.content;
  } else {
    // 显示全文
    defaultContent.value = props.newsInfo.report;
  }
  // 编辑状态
  if (editorNews.value) {
    editorValue.value = defaultContent.value;
  }
});
// 切换编辑状态
function editorNewBtn(): void {
  if (!editorNews.value) {
    editorValue.value = defaultContent.value;
    editorNews.value = true;
    newsMen.value = '保存';
  } else {
    newsMen.value = '编辑';
    editorNews.value = false;
  }
}
// 取消编辑
function cancelEditor(): void {
  emit('updateNews', {
    index: props.id,
    content: editorValue.value,
    // eslint-disable-next-line no-underscore-dangle
    id: props.newsInfo._id
  });
}
// 跳转到新闻详情页
function gotoDetails() {
  router.push({
    path: '/news/details',
    query: {
      url: props.newsInfo.url
    }
  });
}
</script>

<style lang="scss" scoped>
.news-item {
  font-size: 18px;

  li {
    margin-bottom: 5px;
  }

  textarea {
    font-size: 18px;
  }
}

.news-menu {
  display: flex;
  margin: 10px 0;
}

.news-menu > * {
  margin-right: 10px;
}

.news-segmentation > div {
  margin-right: 5px;
}

.news-url {
  color: #178bcf;
  cursor: pointer;
}
</style>
