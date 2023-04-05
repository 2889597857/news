<template>
  <v-chart class="w-554px h-360px" :option="option" />
</template>

<script lang="ts" setup>
import { getTaskCount } from '@/api';
import dayjs from 'dayjs';
import { LineChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([CanvasRenderer, LineChart]);

const option = ref();

const data = { xAxis: [], seriesA: [], seriesB: [] };
onMounted(async () => {
  const count = await getTaskCount();

  count.forEach(x => {
    data.xAxis.push(dayjs(x.time).format('HH:mm'));
    data.seriesA.push(x.count);
    data.seriesB.push(x.success);
  });

  option.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['链接数', '内容数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        color: '#8e9dff',
        name: '链接数',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#8e9dff'
              },
              {
                offset: 1,
                color: '#fff'
              }
            ]
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: data.seriesA
      },
      {
        color: '#26deca',
        name: '内容数',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#26deca'
              },
              {
                offset: 1,
                color: '#fff'
              }
            ]
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: data.seriesB
      }
    ]
  };
});
</script>

<style lang="scss" scoped></style>
