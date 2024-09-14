<script setup>
    const props = defineProps({
        link: {
            type: Boolean,
            default: false,
        },
        to: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'button',
        },
        text: {
            type: String,
            default: '',
        },
        appendIcon: {
            type: String,
            default: '',
        },
        prependIcon: {
            type: String,
            default: '',
        },
    })
</script>

<template>
    <v-btn
        v-if="!link"
        class="base-button"
        :type="type"
        :append-icon="appendIcon"
        :prepend-icon="prependIcon"
    >
        {{ text }}
        <slot></slot>
    </v-btn>

    <v-btn
        v-else
        class="base-button"
        :to="to"
        rounded
    >
        {{ text }}
        <slot></slot>
    </v-btn>
</template>

<style scoped>
    .base-button {
        color: #fff;
        background: linear-gradient(var(--color-gradient-start), var(--color-gradient-end));
    }
</style>