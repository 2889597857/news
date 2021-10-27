<script lang="ts" setup>
import { NDivider, NEllipsis } from 'naive-ui';
import { ref } from 'vue-demi';
const a = ref("wqeshjd ")
</script>
<template>
    {{ a }}
    <n-divider :dashed="true" title-placement="left">啊</n-divider>
    <n-ellipsis
        style="max-width: 100px;"
        :line-clamp="4"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatum veritatis laudantium soluta esse quos harum hic doloremque optio iusto labore architecto, vitae repudiandae. Hic ipsum consequuntur dignissimos itaque adipisci.</n-ellipsis>
</template>
<style lang="scss" scoped>
</style>
