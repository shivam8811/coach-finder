<script setup>
    import { ref } from 'vue';
    import BaseButton from '@/components/ui/BaseButton.vue';

    const emit = defineEmits(['applyFilters', 'resetFilters']);
    const options = ['frontend', 'backend', 'carrier']
    const selectedOptions = ref([]);

    function capitalizeFirstLetter(word) {
        if (word.length < 2) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function applyFilters() {
        emit('applyFilters', selectedOptions.value);
    }

    function resetFilters() {
        selectedOptions.value = [];
        emit('resetFilters');
    }
</script>

<template>
    <base-card class="mt-6">
        <h2>Find your coach</h2>
        <div class="d-flex flex-column flex-md-row">
            <v-checkbox
                v-for="option in options"
                :key="option"
                v-model="selectedOptions"
                :label="capitalizeFirstLetter(option)"
                :value="option"
                @change="applyFilters"
                hide-details
            ></v-checkbox>
        </div>

        <base-button @click="resetFilters">
            <v-icon icon="mdi-refresh"></v-icon>
            Reset Filters
        </base-button>
    </base-card>
</template>