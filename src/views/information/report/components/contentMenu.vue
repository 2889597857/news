<!-- eslint-disable no-underscore-dangle -->
<template>
  <n-dropdown
    :show="dropdownVisible"
    :options="options"
    placement="bottom-start"
    :x="x"
    :y="y"
    @clickoutside="hide"
    @select="handleSelect"
  >
  </n-dropdown>
</template>

<script lang="ts" setup>
import { getReportNews, updateNewsState, updateReportTime } from '@/api';
import { useReportStore } from '@/store';
import { copyNews, hourToMillisecond, isAM } from '@/utils';
import { useClipboard } from '@vueuse/core';
import dayjs from 'dayjs';
import { NDropdown, useMessage } from 'naive-ui';
import { computed } from 'vue';

const reportStore = useReportStore();
const message = useMessage();
const { text, isSupported, copy } = useClipboard();

const props = defineProps({
  visible: Boolean,
  /** 鼠标x坐标 */
  x: Number,
  /** 鼠标y坐标 */
  y: Number,
  model: Boolean
});

const emit = defineEmits(['update:visible']);

const options = computed(() => [
  {
    label: '取消报送',
    key: 0
  },
  {
    label: '复制新闻',
    key: 1
  },
  {
    label: '修改时间',
    key: 2,
    disabled: props.model
  }
]);

const dropdownVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});

function getTodyReportNews() {
  getReportNews().then(res => {
    if (res) reportStore.addReport(res);
  });
}

async function handleSelect(key) {
  const { currentReport } = reportStore;

  if (key === 0) {
    // 取消报送
    updateNewsState({ _id: currentReport._id, state: 0 }).then(res => {
      if (res.state === 0) {
        message.success('取消成功', {
          keepAliveOnHover: true
        });
        getTodyReportNews();
      }
    });
  } else if (key === 1) {
    // 复制新闻
    if (isSupported) {
      copy(copyNews(currentReport));
      message.info('复制成功', {
        keepAliveOnHover: true
      });
    } else {
      message.error('复制失败', {
        keepAliveOnHover: true
      });
    }
    hide();
    return;
  } else {
    // 修改时间
    const reportTime = dayjs(currentReport.reportTime).valueOf();

    const AM = isAM(reportTime);

    const time = AM ? reportTime + hourToMillisecond(12) : reportTime - hourToMillisecond(12);
    updateReportTime({ _id: currentReport._id, date: time }).then(() => {
      getTodyReportNews();
      message.success('修改成功', {
        keepAliveOnHover: true
      });
    });
  }
  hide();
}

function hide() {
  dropdownVisible.value = false;
}
</script>
