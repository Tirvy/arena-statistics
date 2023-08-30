<script setup lang="ts">
const lastVisits: Ref<Visit[]> = ref([]);
const newVisits: Ref<Visit[]> = ref([]);
const snackbar: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

async function getLastVisits() {
    const result = await $fetch('/api/supabase/get-last-visits');
    lastVisits.value = result;
}

async function getNewVisits() {
    loading.value = true;
    const result = await $fetch('/api/firestore/get-visits', {
        query: {
            start: lastVisits.value[0].start
        }
    });
    loading.value = false;
    snackbar.value = true;
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
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-actions>
                    <v-btn @click="getLastVisits">
                        get last visit
                    </v-btn>
                </v-card-actions>
                <v-table>
                    <tbody>
                        <tr v-for="item in lastVisits">
                            <td>{{ item.firebaseId }}</td>
                            <td>{{ item.visiterId }}</td>
                            <td>{{ item.start }}</td>
                            <td>{{ item.end }}</td>
                            <td>{{ item.checkType }}</td>
                            <td>{{ item.checkSum }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-actions>
                    <v-btn @click="getNewVisits"
        :loading="loading">
                        get new visits
                    </v-btn>
                </v-card-actions>
                <v-table>
                    <tbody>
                        <tr v-for="item in newVisits">
                            <td>{{ item.firebaseId }}</td>
                            <td>{{ item.visiterId }}</td>
                            <td>{{ item.start }}</td>
                            <td>{{ item.end }}</td>
                            <td>{{ item.checkType }}</td>
                            <td>{{ item.checkSum }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>

            <v-snackbar v-model="snackbar">
                visits aquired
                <template v-slot:actions>
                    <v-btn color="pink" variant="text" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-actions>
                    <v-btn @click="sendVisits">
                        send these visits
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>