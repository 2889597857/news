<template>
    <h1>a1</h1>
    <input type="text" v-model="a" />
</template>
<script lang="ts">
import { ref } from "vue";
export default {
    name: "PageA1",
    setup(props) {
        const a = ref('')
        return {
            a
        }
    }
};
</script>