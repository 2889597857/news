<template>
  <v-chart class="w-full h-360px" :option="option" />
</template>

<script lang="ts" setup>
import { getFu } from '@/api';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const option = ref();

const a = [];
const b = [];

onMounted(async () => {
  const count = await getFu();
  count.forEach(x => {
    a.push({ name: x.name, value: x.count });
    b.push({ name: x.name, value: x.report });
  });
  option.value = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '1%',
      left: 'center',
      itemStyle: {
        borderWidth: 0
      }
    },
    series: [
      {
        color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
        name: '时间安排',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12'
          }
        },
        labelLine: {
          show: false
        },
        data: b
      }
    ]
  };
});
</script>
