<script setup>
    import RequestItem from '@/components/requests/RequestItem.vue';
    import { useRequestStore } from '@/stores/request.js';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';

    const requestStore = useRequestStore()
    const { hasRequests, requests, loadingRequests } = storeToRefs(requestStore);
    const { fetchRequests } = requestStore;

    onMounted(() => {
        fetchRequests()
        console.log('requests', requests.value)
    })
</script>

<template>
    <section>
        <BaseSkeletonLoader
            v-if="loadingRequests"
            class="border"
        />
        <base-card v-else>
            <template v-if="hasRequests">
                <header>
                    <h2>Requests Received</h2>
                </header>
                <template v-for="request in requests" :key="request.id">
                    <RequestItem :request="request" />
                </template>
            </template>
            <h3 v-else>You haven't received any request yet!</h3>
        </base-card>
    </section>
</template>