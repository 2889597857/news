<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:6">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="w-full h-360px py-12px">
          <h3 class="text-16px font-bold">Dashboard</h3>
          <p class="text-#aaa">Overview Of Lasted Month</p>
          <h3 class="pt-32px text-24px font-bold">
            <n-number-animation :from="0" :to="12039" />
          </h3>
          <p class="text-#aaa">Current Month Earnings</p>
          <h3 class="pt-32px text-24px font-bold">
            <n-number-animation :from="0" :to="12039" />
          </h3>
          <p class="text-#aaa">Current Month Sales</p>
          <n-button class="mt-24px whitespace-pre-wrap" type="primary">Last Month Summary</n-button>
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
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
</script>
