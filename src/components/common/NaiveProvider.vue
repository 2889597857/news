<template>
  <!-- 加载条组件 -->
  <n-loading-bar-provider>
    <!-- 对话框组件 -->
    <n-dialog-provider>
      <!-- 通知框组件 -->
      <n-notification-provider>
        <!-- 信息组件 -->
        <n-message-provider>
          <slot></slot>
          <naive-provider-content />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui';
import { defineComponent, h } from 'vue';

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  }
});
</script>
<style scoped></style>
