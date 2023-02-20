<script lang="ts" setup>
import { getReportNews } from '@/api';
import { useReportStore } from '@/store/counter';
import { useTimeStore } from '@/store/timeStore';
import { NCard, NDivider, NSpace, NSwitch } from 'naive-ui';
import Clipboard from './components/clipboard.vue';
import ContentMenu from './components/contentMenu.vue';
import datePicker from './components/datePicker.vue';
import ReportItem from './components/item.vue';
import Task from './components/task.vue';

const timeStore = useTimeStore();
const reportStore = useReportStore();

const newsShowModel = ref(false);

const dropdown = reactive({
  visible: false,
  x: 0,
  y: 0
});

function showDropdown() {
  dropdown.visible = true;
}
function hideDropdown() {
  dropdown.visible = false;
}
function setDropdown(x, y) {
  Object.assign(dropdown, { x, y });
}

const isClickContextMenu = false;

function handleDropdownVisible(visible) {
  if (!isClickContextMenu) {
    dropdown.visible = visible;
  }
}

const handleContextMenu = (e, news) => {
  if (timeStore.showContentMenu) {
    e.preventDefault();
    const { clientX, clientY } = e;
    reportStore.addCurrentReport(news);
    setDropdown(clientX, clientY);
    showDropdown();
  } else return false;
};
const reportNewsList = computed(() => {
  if (newsShowModel.value) {
    console.log(reportStore.list);
    return reportStore.report;
  }
  return timeStore.isAM() ? reportStore.list : [...reportStore.list].reverse();
});

onMounted(() => {
  getReportNews().then(res => {
    if (res) reportStore.addReport(res);
  });
});
</script>

<template>
  <div class="container">
    <n-space size="large">
      <date-picker />
      <n-switch v-model:value="newsShowModel" size="large">
        <template #checked> 时间 </template>
        <template #unchecked> 全部 </template>
      </n-switch>
      <clipboard :model="newsShowModel" />
      <task />
    </n-space>
    <div v-if="newsShowModel">
      <n-divider class="time-title" title-placement="left"> 全部 </n-divider>
      <report-item
        v-for="(item, index) in reportNewsList"
        :id="index"
        :key="item._id"
        :report-info="item"
        @contextmenu="handleContextMenu($event, item)"
      />
    </div>
    <div v-else>
      <div v-for="list in reportNewsList" :key="list.title">
        <n-divider class="time-title" title-placement="left">
          {{ list.title }}
        </n-divider>
        <div v-if="list.list.length > 0">
          <report-item
            v-for="(item, index) in list.list"
            :id="list.count + index"
            :key="item.title"
            :report-info="item"
            @contextmenu="handleContextMenu($event, item)"
          />
        </div>
        <router-link v-else to="/">
          <n-card size="huge"> 还没有内容。 </n-card>
        </router-link>
      </div>
    </div>
  </div>
  <content-menu
    :model="newsShowModel"
    :visible="dropdown.visible"
    :x="dropdown.x"
    :y="dropdown.y"
    @update:visible="handleDropdownVisible"
  >
  </content-menu>
</template>

<style scoped>
.container {
  padding-top: 58px;
}

.time-title {
  font-size: 23px;
  font-weight: bolder;
}

.report-menu {
  display: flex;
}
</style>
