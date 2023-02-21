<script lang="ts" setup>
import { useReportStore } from '@/store';
</script>

<template>
  <drag-box>
    <n-badge :value="useReportStore().count" :max="99">
      <span style="margin: 0 14px">报送信息</span>
    </n-badge>
  </drag-box>
</template>
