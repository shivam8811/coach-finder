<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        title: String,
    })
    const text = computed(() => props.title.toLowerCase())
</script>

<template>
    <span class="base-badge">
        {{ text }}
    </span>
</template>

<style scoped>
    .base-badge {
        background-color: var(--color-primary);
        color: #fff;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
    }
</style>