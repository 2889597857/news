<script lang="ts" setup>
import { useReportStore, useTimeStore } from '@/store';
import { copyNewsList } from '@/utils';
import { useClipboard } from '@vueuse/core';
import { NButton, NButtonGroup, NDropdown, NIcon, useMessage } from 'naive-ui';

const message = useMessage();

const props = defineProps<{
  model: boolean;
}>();

const timeStore = useTimeStore();

const { isSupported, copy } = useClipboard();

const reportStore = useReportStore();

const copyNews = key => {
  if (!isSupported) {
    message.warning('您的浏览器不支持一键复制功能');
    return;
  }
  let text = '';
  if (key === 2) {
    text = copyNewsList(reportStore.report);
  } else {
    text = copyNewsList(reportStore.list[key].list, reportStore.list[key].count);
  }
  copy(text).then(() => {
    message.success('复制成功');
  });
};

const options = [
  {
    label: '全部',
    key: 2
  },
  {
    label: '上午',
    key: 0
  },
  {
    label: '下午',
    key: 1
  }
];

function handleSelect(key: number) {
  copyNews(key);
}

const copyNowReport = () => {
  if (!props.model) copyNews(timeStore.isAM() ? 0 : 1);
  else copyNews(2);
};
</script>

<template>
  <n-button-group>
    <n-button @click="copyNowReport">一键复制</n-button>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button>
        <template #icon>
          <n-icon>
            <svg
              t="1663726423540"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2374"
              width="16"
              height="16"
            >
              <path
                d="M916.48 312.608l-370.56 389.76a47.104 47.104 0 0 1-64.256 3.392l-3.552-3.392L107.52 312.64a3.2 3.2 0 0 1 2.304-5.408h86.4a6.4 6.4 0 0 1 4.608 1.984L512 636.384l311.136-327.2a6.4 6.4 0 0 1 4.64-1.984h86.4a3.2 3.2 0 0 1 2.304 5.408z"
                p-id="2375"
              ></path>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-dropdown>
  </n-button-group>
</template>
