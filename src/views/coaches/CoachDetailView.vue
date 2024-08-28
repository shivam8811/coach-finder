<script setup>
    import BaseCard from '@/components/ui/BaseCard.vue';
    import BaseButton from '@/components/ui/BaseButton.vue';
    import BaseBadge from '@/components/ui/BaseBadge.vue';
    import { computed, onBeforeMount, ref } from 'vue';
    import { useCoachStore } from '@/stores/coach.js';
    import { useRoute } from 'vue-router'

    const props = defineProps({
        id: String,
    })
    const coachStore = useCoachStore()
    const route = useRoute()
    const selectedCoach = ref(null);
    onBeforeMount(() => {
        selectedCoach.value = coachStore.coaches.find(coach => coach.id === props.id);
    })
    const fullName = computed(() => selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName);
    const rate = computed(() => selectedCoach.value.hourlyRate);
    const description = computed(() => selectedCoach.value.description);
    const areas = computed(() => selectedCoach.value.areas);
    const contactLink = computed(() => `${ route.path }/contact`);

</script>

<template>
    <section>
        <base-card class="my-2">
            <h3>{{ fullName }}</h3>
            <h5>{{ rate }}€/hour</h5>
            <div class="d-flex mt-2 ga-2">
                <BaseBadge
                    v-for="area in areas"
                    :key="area"
                    :title="area"
                />
            </div>
            <p>{{ description }}</p>
        </base-card>
    </section>

    <section v-if="$route.name !== 'contact'">
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
        </base-card>
    </section>

    <section v-else>
        <base-card>
            <RouterView :id="id"/>
        </base-card>
    </section>
</template>

<style scoped>

</style>