<script setup>
    import { computed } from 'vue';
    import BaseButton from '@/components/ui/BaseButton.vue';
    import BaseBadge from '@/components/ui/BaseBadge.vue';

    const props = defineProps({
        id: String,
        firstName: String,
        lastName: String,
        rate: Number,
        areas: Array,
    })

    const fullName = computed(() => props.firstName + ' ' + props.lastName)
    const coachDetailsLink = computed(() => `/coaches/${ props.id }`)
    const coachContactLink = computed(() => `/coaches/${ props.id }/contact`)
</script>

<template>
    <v-card class="my-4 pa-4" variant="outlined">
        <h3>{{ fullName }}</h3>
        <h5>{{ rate }}€/hour</h5>
        <div class="d-flex my-2 ga-2">
            <BaseBadge
                v-for="area in areas"
                :key="area"
                :title="area"
            />
        </div>
        <div class="actions d-flex justify-center justify-md-end ga-4">
            <base-button link :to="coachDetailsLink">View details</base-button>
            <base-button link :to="coachContactLink">Contact</base-button>
        </div>
    </v-card>
</template>

<style scoped>

</style>