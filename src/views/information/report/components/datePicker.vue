<template>
  <n-date-picker v-model:value="reportDate" type="date" :is-date-disabled="disablePreviousDate" />
</template>
<script lang="ts" setup>
import { getReportNews } from '@/api';
import { useReportStore, useTimeStore } from '@/store';

const timeStore = useTimeStore();
const reportStore = useReportStore();

const reportDate = computed({
  get() {
    return timeStore.pickDate;
  },
  set(date) {
    getReportNews(date).then(res => {
      reportStore.addReport(res);
      timeStore.changePickDate(date);
    });
  }
});
// 禁止选择今天之后的日期
const disablePreviousDate = ts => {
  return ts > Date.now();
};
</script>
