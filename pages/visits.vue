<script setup lang="ts">
const { data } = await useFetch('/api/firestore/get-visits')
console.log(data.value);
</script>


<template>
    <div>
        <p v-for="item in data">
            {{ item.id }} - {{ item.start }}:{{ item.end }}
        </p>
    </div>
</template>