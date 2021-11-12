<script lang="ts" setup>
import { useAppStoreHook } from '@/store/modules/app';
const app = useAppStoreHook()

</script>
<template lang="pug">
p {{ app.name }}
p {{ app.age }}
p {{ app.score }}
p {{ app.standard }}
p {{ app.standard1(app.standard) }}
</template>