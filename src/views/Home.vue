<script lang="ts" setup>
import { onMounted, ref } from 'vue-demi';
import { a } from '@/api/a';
let a1 = ref('1121412asfas3')
import { useAppStoreHook } from '@/store/modules/app';
a().then(res => console.log(res))

const app = useAppStoreHook()
a()

</script>
<template lang="pug">
p {{ app.name }}
p {{ app.age }}
p {{ app.score }}
p {{ app.standard }}
p {{ app.standard1(app.standard) }}
</template>