<script setup>
    const props = defineProps({
        message: String,
    })
</script>

<template>
    <div class="validation-error-message">
        <span v-if="message">{{ message }}</span>
    </div>
</template>

<style scoped>
    .validation-error-message {
        min-height: 1.4rem;
        margin-left: 0.3rem;
        color: red;
        font-size: small;
    }
</style>
