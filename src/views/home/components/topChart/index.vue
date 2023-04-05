<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:6">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="w-full h-360px py-12px">
          <h3 class="text-16px font-bold">基本信息</h3>
          <h3 class="pt-32px text-24px font-bold">
            <n-number-animation :from="0" :to="info.count" />
          </h3>
          <p class="text-#aaa">采集新闻</p>

          <h3 class="pt-32px text-24px font-bold">
            <n-number-animation :from="0" :to="info.report" />
          </h3>
          <p class="text-#aaa">报送新闻</p>
          <task-menu class="mt-10px" />
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:10">
      <!-- <line-chart /> -->
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <line-chart />
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <!-- <pie-chart /> -->

      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <pie-chart />
      </n-card>
    </n-grid-item>
    <!-- <LineCharts /> -->
  </n-grid>
</template>

<script lang="ts" setup>
import { getBase } from '@/api';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';

const info = reactive({
  count: 0,
  report: 0
});

onMounted(async () => {
  const data = await getBase();
  console.log('data: ', data);
  Object.assign(info, data);
});
</script>
