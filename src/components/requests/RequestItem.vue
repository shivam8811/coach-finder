<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        request: Object,
    })
    const emailLink = computed(() => `mailto:${ props.request.email }`);
</script>

<template>
    <section>
        <base-card class="my-3" variant="outlined">
            <div>
                From: <strong>{{ request.firstName }} {{ request.lastName }}</strong>
            </div>

            <div>
                Reply to: <strong><a :href="emailLink">{{ request.email }}</a></strong>
            </div>

            <div>
                Message: <span>{{ request.message }}</span>
            </div>
        </base-card>
    </section>
</template>

<style scoped>

</style>