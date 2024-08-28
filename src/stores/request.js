import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useRequestStore = defineStore('request', () => {
    const requests = ref([])
    const loadingRequests = ref(false)
    const hasRequests = computed(() => requests.value && requests.value.length > 0)

    async function fetchRequests() {
        loadingRequests.value = true
        try {
            const response = await axios.get('https://coach-finder-3a531-default-rtdb.europe-west1.firebasedatabase.app/requests.json')

            Object.entries(response.data).forEach(([id, request]) => {
                const exists = requests.value.some(existingCoach => existingCoach.id === id);
                if (!exists) {
                    requests.value.push({
                        id,
                        ...request,
                    });
                }
                console.log(request);
            });
        } catch (error) {
            console.log('error', error)
        } finally {
            loadingRequests.value = false
        }
    }

    return {
        fetchRequests,
        hasRequests,
        requests,
        loadingRequests,
    }
})
