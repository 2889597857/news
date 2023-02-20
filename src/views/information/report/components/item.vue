
<script setup>
const props = defineProps(['reportInfo', 'id']);
</script>
<template>
  <ul class="news-content" style="margin-bottom: 10px;">
    <li>{{ props.id + 1 }}、标题：{{ props.reportInfo.title }}</li>
    <li style="word-wrap: break-word;">
      链接：
      <a :href="props.reportInfo.url" target="_blank" class="news-url">{{ props.reportInfo.url }}</a>
    </li>
    <li>摘要：{{ props.reportInfo.report }}</li>
  </ul>
</template>