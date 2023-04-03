<template>
  <div class="flex flex-wrap">
    <line-charts />
    <pie-charts />
    <ad-chart />
  </div>
</template>
<script lang="ts" setup>
import adChart from './components/adChart.vue';
import LineCharts from './components/LineCharts.vue';
import PieCharts from './components/PieCharts.vue';
</script>
