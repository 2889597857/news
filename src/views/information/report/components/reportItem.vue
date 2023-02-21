<script lang="ts" setup>
defineProps<{
  reportInfo: NEWS.NewsItem;
  id: number;
}>();
</script>
<template>
  <ul class="news-content" style="margin-bottom: 10px">
    <li>{{ id + 1 }}、标题：{{ reportInfo.title }}</li>
    <li style="word-wrap: break-word">
      链接：
      <a :href="reportInfo.url" target="_blank" class="news-url">{{ reportInfo.url }}</a>
    </li>
    <li>摘要：{{ reportInfo.report }}</li>
  </ul>
</template>
