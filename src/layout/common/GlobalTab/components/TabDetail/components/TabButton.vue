<template>
  <div class="cursor-pointer transition-all-300 tab-button" :class="{ 'btn-active': active }">
    <div class="btn-shadow absolute wh-full -z-1">
      <svg style="width: 100%; height: 100%">
        <defs>
          <symbol id="geometry-left" viewBox="0 0 214 36">
            <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"></path>
          </symbol>
          <symbol id="geometry-right" viewBox="0 0 214 36"><use xlink:href="#geometry-left"></use></symbol>
          <clipPath><rect width="100%" height="100%" x="0"></rect></clipPath>
        </defs>
        <svg width="51%" height="100%">
          <use xlink:href="#geometry-left" width="214" height="36" fill="currentColor"></use>
        </svg>
        <g transform="scale(-1, 1)">
          <svg width="51%" height="100%" x="-100%" y="0">
            <use xlink:href="#geometry-right" width="214" height="36" fill="currentColor"></use>
          </svg>
        </g>
      </svg>
    </div>
    <slot name="prefix"></slot>
    <slot></slot>
    <div v-if="closable" class="close-btn" @click="close">
      <svg width="1em" height="1em" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
        ></path>
      </svg>
    </div>
    <div class="btn-separator -z-2"></div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  /** 是否激活 */
  active: boolean;
  /** 是否显示关闭按钮 */
  closable: boolean;
  /** 激活的样式 */
  activeColor?: string;
}
withDefaults(defineProps<Props>(), {
  active: false,
  closable: true,
  activeColor: '#1890ff'
});

const emits = defineEmits(['close']);
const close = e => {
  e.stopPropagation();
  emits('close');
};
</script>
<style lang="scss">
.tab-button {
  padding: 6px 24px;
  margin-right: -18px;
  display: inline-flex;
  grid-gap: 16px;
  gap: 16px;
  position: relative;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
}

.btn-active.tab-button {
  color: #1890ff;
}
.btn-active.tab-button .btn-shadow {
  color: #e8f4ff !important;
}

.tab-button:hover .btn-shadow {
  color: #dee1e6;
}

.btn-shadow {
  color: transparent;
}

.close-btn {
  border-radius: 50%;
  font-size: 14px;
  display: inline-flex;
  position: relative;
  height: 16px;
  width: 16px;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 12px;
    color: #fff;
    background-color: #9ca3af;
  }
}
.btn-active .close-btn:hover {
  background-color: #1890ff;
}
.btn-separator {
  --un-bg-opacity: 1;
  background-color: rgba(31, 34, 37, var(--un-bg-opacity));
  position: absolute;
  height: 16px;
  width: 1px;
  right: 7px;
}

.tab-button:hover .btn-separator,
.btn-active .btn-separator {
  opacity: 0;
}
</style>
