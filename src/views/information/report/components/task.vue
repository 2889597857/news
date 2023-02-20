<script setup>
import { getTaskInfo, startTask } from '@/api';
import dayjs from 'dayjs';
import { NButton, NSpace, useMessage } from 'naive-ui';
import { computed } from 'vue';

const message = useMessage();

const taskInfo = reactive({
  isExecuting: false,
  creationTime: '-',
  success: 0,
  difference: 0
})

const start = async () => {
  if (taskInfo.difference == '-' || taskInfo.difference >= 1 * 60 * 60 * 1000) {
    const res = await startTask()
    if (res.cooldown) {
      taskInfo.isExecuting = true;
      taskInfo.creationTime = res.creationTime
      taskInfo.success = '-'
      message.success('任务开始执行')
    }
  } else {
    message.info('技能冷却中')
  }
}


const creationTime = computed(() => taskInfo.creationTime == '-' ? '-' : dayjs(taskInfo.creationTime).format('MM-DD HH:mm'))

onMounted(() => {
  getTaskInfo().then((res) => {
    Object.assign(taskInfo, res);
  });
})
</script>
<template>

  <div class="task">
    <n-space>
      <n-button :disabled="taskInfo.isExecuting" @click="start">{{ taskInfo.isExecuting ? '任务正在执行' : '启动任务'
      }}</n-button>
      <n-space align="start" size="small" vertical>
        <span>上次任务时间：{{ creationTime }}</span>
        <span>采集新闻条数：{{ taskInfo.success }}</span>
      </n-space>
    </n-space>
  </div>
</template>
<style scoped>
.task span {
  font-size: 12px;
}
</style>