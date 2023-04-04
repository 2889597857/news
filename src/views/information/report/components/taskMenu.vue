<script lang="ts" setup>
import { getTaskInfo, startTask } from '@/api';
import dayjs from 'dayjs';

const taskInfo = reactive({
  isExecuting: false,
  time: 0,
  success: 0,
  difference: 0
});

const start = async () => {
  const time = +new Date();
  if (time - dayjs(taskInfo.time).valueOf() >= 0.5 * 60 * 60 * 1000) {
    const res = await startTask();
    if (res.id) {
      taskInfo.isExecuting = true;
      taskInfo.time = res.time;
      taskInfo.success = 0;
      window.$message.success('任务开始执行');
    }
  } else {
    window.$message.info('技能冷却中');
  }
};

const creationTime = computed(() => (taskInfo.time ? dayjs(taskInfo.time).format('MM-DD HH:mm') : '-'));

onMounted(() => {
  getTaskInfo().then(res => {
    Object.assign(taskInfo, res);
  });
});
</script>
<template>
  <div class="task">
    <n-space>
      <n-button :disabled="taskInfo.isExecuting" @click="start">{{
        taskInfo.isExecuting ? '任务正在执行' : '启动任务'
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
