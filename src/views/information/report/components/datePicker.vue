<template>
  <n-date-picker type="date" v-model:value="reportDate" :is-date-disabled="disablePreviousDate" />
</template>
<script setup>
import { getReportNews } from '@/api';
import { useReportStore } from '@/stores/counter.js';
import { useTimeStore } from '@/stores/timeStore';
import { NDatePicker } from 'naive-ui';

const timeStore = useTimeStore()
const reportStore = useReportStore()

const reportDate = computed({
  get() {
    return timeStore.pickDate;
  },
  set(date) {
    getReportNews(date).then((res) => {
      reportStore.addReport(res)
      timeStore.changePickDate(date)
    });
  }
});
const disablePreviousDate = (ts) => {
  return ts > Date.now();
}

</script>