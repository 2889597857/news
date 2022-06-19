<template>
  <div class="news-item">
    <div class="news-menu">
      <n-button @click="editorNewBtn">{{ newsMen }}</n-button>
      <n-space> <n-switch v-model:value="showAll" />显示全文 </n-space>
    </div>
    <ul class="news-content">
      <li>{{ props.id + 1 }}、标题：{{ props.newsInfo.title }}</li>
      <li>
        链接：
        <span class="news-url" @click="gotoDetails">{{ props.newsInfo.url }}</span>
      </li>
      <li v-show="!editorNews">摘要：{{ defaultContent }}</li>
      <n-input v-show="editorNews" v-model:value="editorValue" type="textarea" placeholder="基本的 Textarea" />
      <li class="news-segmentation">
        关键字：
        <n-tag v-for="item in props.newsInfo.segmentation" :key="item.keyword" type="info">{{ item.keyword }} </n-tag>
      </li>
    </ul>
    <n-divider />
  </div>
</template>
<script lang="ts" setup>
type NewItem = {
  _id: string;
  title: string;
  url: string;
  content: [string];
  segmentation: [{ keyword: string }];
  report: string;
};
const props = defineProps<{
  newsInfo: NewItem;
  id: number;
}>();

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

const gotoDetails = () => {
  // eslint-disable-next-line no-console
  console.log('123');
};

const showAll = ref(false);
const defaultContent = computed(() => {
  if (!showAll.value) {
    const content = `${props.newsInfo.content[0]}${props.newsInfo.content[1]}`;
    if (editorNews.value) {
      editorValue.value = content;
    }
    return content;
  }
  const content = props.newsInfo.content.join('');
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
}

.news-segmentation > div {
  margin-right: 5px;
}

.news-url {
  color: #178bcf;
  cursor: pointer;
}
</style>
