<script setup>
    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <v-text-field
        density="comfortable"
        :label="label"
        variant="outlined"
        hide-details
    ></v-text-field>
</template>
