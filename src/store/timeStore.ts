import { getTodayZeroHour, hourToMillisecond } from '@/utils';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTimeStore = defineStore('time', () => {
  const pickDate = ref(getTodayZeroHour());
  const showContentMenu = computed(() => pickDate.value >= getTodayZeroHour());

  function changePickDate(time) {
    pickDate.value = time;
  }
  function isAM(date?: string | number): boolean {
    return dayjs(date).valueOf() <= pickDate.value + hourToMillisecond(12);
  }
  return {
    pickDate,
    showContentMenu,
    changePickDate,
    isAM
  };
});
