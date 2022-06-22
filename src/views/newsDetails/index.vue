<template>
  <iframe v-if="showIframe" ref="iframe" :src="query"></iframe>
  <div v-else>
    <n-input v-model:value="iframeURL" type="text" placeholder="基本的 Input" />
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
const showIframe = ref(false);
const query = ref('');
const iframeURL = ref('');
const iframe = ref(null);
onMounted(() => {
  query.value = route.query.url;
  if (query) {
    showIframe.value = true;
    console.log(iframe.value);
  }
});
</script>
<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>
