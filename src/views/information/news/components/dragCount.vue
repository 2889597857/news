<script lang="ts" setup>
import { useReportStore } from '@/store';
</script>

<template>
  <drag-box>
    <n-badge show-zero :value="useReportStore().count" :max="99">
      <div class="text-50px">
        <!-- <div class="text-50px" click="$router.push({ path: '/information/report' })"> -->
        <svg-icon v-if="useReportStore().count > 0" icon="vscode-icons:default-root-folder-opened"></svg-icon>
        <svg-icon v-else icon="vscode-icons:default-root-folder"></svg-icon>
      </div>
    </n-badge>
  </drag-box>
</template>
