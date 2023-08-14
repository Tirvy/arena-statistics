<script setup lang="ts">
const lastVisits = ref([]);
const newVisits = ref([]);

async function getLastVisits() {
    try {
        const result = await $fetch('/api/supabase/get-last-visits');
        lastVisits.value = result;
    } catch (error) {
        console.log(error.message);
    }
}

async function getNewVisits() {
    try {
        const result = await $fetch('/api/firestore/get-visits', {
            query: {
                start: lastVisits.value[0].start
            }
        });
        newVisits.value = result.filter(item => item.firebaseId != lastVisits.value[0].firebaseId);
    } catch (error) {
        console.log(error.message);
    }
}

async function sendVisits() {
    try {
        const { result } = await $fetch('/api/supabase/add-visits', {
            method: "POST",
            body: newVisits.value,
        });
    } catch (error) {
        console.log(error.message);
    }
}
</script>


<template>
    <div>
        <div>
            <button @click="getLastVisits">
                get last visit
            </button>

        </div>
        <div>
            <p v-for="item in lastVisits">
                {{ item.firebaseId }} - {{ item.start }}:{{ item.end }}
            </p>
            <button @click="getNewVisits">
                get new visits
            </button>

        </div>
        <div>

            <p v-for="item in newVisits">
                {{ item.firebaseId }} - {{ item.start }}:{{ item.end }}
            </p>
            <button @click="sendVisits">
                send these visits
            </button>
        </div>
    </div>
</template>