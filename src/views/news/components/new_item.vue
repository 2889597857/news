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
      <li v-show="!editorNews">摘要：{{ props.newsInfo.report ? props.newsInfo.report : defaultContent }}</li>
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
        <n-tag v-for="item in props.newsInfo.segmentation" :key="item.keyword" type="info">{{ item.keyword }} </n-tag>
      </li>
    </ul>
    <n-divider />
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

type NewItem = {
  _id: string;
  title: string;
  url: string;
  content: Array<string>;
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

const newsMen = ref('编辑');
const editorNews = ref(false);
const editorValue = ref('');

const editorNewBtn = (): void => {
  if (!editorNews.value) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    editorValue.value = defaultContent.value;
    editorNews.value = true;
    newsMen.value = '保存';
  } else {
    newsMen.value = '编辑';
    editorNews.value = false;
  }
};
const cancelEditor = (): void => {
  emit('updateNews', {
    index: props.id,
    content: editorValue.value,
    // eslint-disable-next-line no-underscore-dangle
    id: props.newsInfo._id
  });
};
const gotoDetails = () => {
  // eslint-disable-next-line no-console
  console.log('123');
};

const showAll = ref(false);
const defaultContent = computed(() => {
  let content = '';
  const contentLength = props.newsInfo.content.length >= 2;

  // 默认只显示新闻前两段内容
  if (!showAll.value && !props.newsInfo.report) {
    content = contentLength ? `${props.newsInfo.content[0]}${props.newsInfo.content[1]}` : props.newsInfo.content[0];
  } else {
    content = props.newsInfo.content.join('');
  }
  if (props.newsInfo.report) {
    content = props.newsInfo.report;
  }
  if (editorNews.value) {
    editorValue.value = content;
  }
  return content;
});
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
