<script setup lang="ts">
const el = ref<HTMLElement | null>(null);
const { innerWidth } = window;
const { style } = useDraggable(el, {
  initialValue: { x: innerWidth / 1.2, y: 300 }
});
</script>

<template>
  <div ref="el" class="cursor-move fixed z-50" :style="style"><slot></slot></div>
</template>
