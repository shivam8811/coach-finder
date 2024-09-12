<script setup>
    import { useCoachStore } from '@/stores/coach.js';
    import CoachItem from '@/components/coaches/CoachItem.vue';
    import CoachFilter from '@/components/coaches/CoachFilter.vue';
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.js';
    import { useSnackbarStore } from '@/stores/snackbar.js';

    const coachStore = useCoachStore()
    const { hasCoaches, coaches, loadingCoaches } = storeToRefs(coachStore)
    const { loadCoaches } = coachStore

    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const snackbarStore = useSnackbarStore();
    const { snackbar } = storeToRefs(snackbarStore);

    onMounted(() => {
        loadCoaches()
        resetFilters()
    })

    const filteredCoaches = ref([]);
    let filteredAreas;

    function handleApplyFilters(areas) {
        let coachesFound;
        filteredAreas = Object.values(areas)
        if (0 === filteredAreas.length) {
            resetFilters();
        } else {
            filteredAreas.forEach((area) => {
                coachesFound = Object.values(coaches.value).filter(coach => coach.areas.includes(area));
            })
            filteredCoaches.value = coachesFound;
        }
    }

    function resetFilters() {
        filteredCoaches.value = []
        Object.values(coaches.value).forEach(coach => {
            filteredCoaches.value.push(coach);
        })
    }

</script>

<template>
    <v-snackbar
        v-model="snackbar.visible"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
    >
        {{ snackbar.message }}
    </v-snackbar>
    <CoachFilter @apply-filters="handleApplyFilters" @reset-filters="resetFilters" />
    <section class="mt-5">
        <base-card>
            <div class="controls d-flex justify-md-space-between">
                <base-button @click="loadCoaches">
                    Refresh
                </base-button>
                <base-button v-if="isAuthenticated" link to="/register">
                    Register as a coach
                </base-button>
            </div>

            <BaseSkeletonLoader v-if="loadingCoaches" />
            <template v-else>
                <div v-if="hasCoaches">
                    <CoachItem
                        v-for="coach in coaches"
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    />
                </div>
                <div v-else>
                    No coach found
                </div>
            </template>
        </base-card>
    </section>
</template>