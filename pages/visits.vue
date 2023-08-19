<script setup lang="ts">
const visiters: Ref<Visit[]> = ref([]);
const lastVisits: Ref<Visit[]> = ref([]);
const newVisits: Ref<Visit[]> = ref([]);

async function getVisiters() {
    const result = await $fetch('/api/firestore/get-visiters');
    visiters.value = result as Visit[];
}

async function getLastVisits() {
    const result = await $fetch('/api/supabase/get-last-visits');
    lastVisits.value = result;
}

async function getNewVisits() {
    const result = await $fetch('/api/firestore/get-visits', {
        query: {
            start: lastVisits.value[0].start
        }
    });
    newVisits.value = result.filter(item => item.firebaseId != lastVisits.value[0].firebaseId);
}

async function sendVisits() {
    await $fetch('/api/supabase/add-visits', {
        method: "POST",
        body: newVisits.value,
    });
    console.log(lastVisits.value[0].start, " send is success");
}
</script>


<template>
    <div>
        <div>
            <v-btn @click="getVisiters">
                get visiters
            </v-btn>

        </div>
        <div>
            <v-btn @click="getLastVisits">
                get last visit
            </v-btn>

        </div>
        <div>
            <table>
                <tr v-for="item in lastVisits">
                    <td>{{ item.firebaseId }}</td>
                    <td>{{ item.visiterId }}</td>
                    <td>{{ item.start }}</td>
                    <td>{{ item.end }}</td>
                    <td>{{ item.checkType }}</td>
                    <td>{{ item.checkSum }}</td>
                </tr>
            </table>
            <v-btn @click="getNewVisits">
                get new visits
            </v-btn>

        </div>
        <div>
            <table>
                <tr v-for="item in newVisits">
                    <td>{{ item.firebaseId }}</td>
                    <td>{{ item.visiterId }}</td>
                    <td>{{ item.start }}</td>
                    <td>{{ item.end }}</td>
                    <td>{{ item.checkType }}</td>
                    <td>{{ item.checkSum }}</td>
                </tr>
            </table>
            <v-btn @click="sendVisits">
                send these visits
            </v-btn>
        </div>
    </div>
</template>