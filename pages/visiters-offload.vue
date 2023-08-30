<script setup lang="ts">
const visiters: Ref<Visit[]> = ref([]);

async function getVisiters() {
    const result = await $fetch('/api/firestore/get-visiters');
    visiters.value = result as Visit[];
}
</script>


<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-actions>
                    <v-btn @click="getVisiters">
                        get visiters
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>