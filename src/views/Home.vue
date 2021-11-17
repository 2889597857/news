<script lang="ts" setup>
import { useAppStoreHook } from '@/store/modules/app';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { a } from '@/api/a';

const app = useAppStoreHook()
const permission = usePermissionStoreHook()

const axios = async () => {
    a().then((res) => console.log(res[0].id))
}
</script>
<template lang="pug">
button(@click="axios")
    | axios
p {{ app.name }}
p {{ app.age }}
p {{ app.score }}
p {{ app.standard }}
p {{ app.standard1(app.standard) }}
p 123
</template>