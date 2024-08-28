import { computed, reactive, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref([])
    const hasCoaches = computed(() => coaches.value && coaches.value.length > 0)
    const loadingCoaches = ref(false)

    async function loadCoaches() {
        loadingCoaches.value = true
        try {
            const response = await axios.get('https://coach-finder-3a531-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')

            Object.entries(response.data).forEach(([id, coach]) => {
                const exists = coaches.value.some(existingCoach => existingCoach.id === id);
                if (!exists) {
                    coaches.value.push({
                        id,
                        ...coach,
                    });
                }
                console.log('coach2', coach);
            });
        } catch (error) {
            console.log('error', error)
        } finally {
            loadingCoaches.value = false
        }
    }

    return {
        loadCoaches,
        loadingCoaches,
        hasCoaches,
        coaches,
    }
})
