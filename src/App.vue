<script setup>
    import TheHeader from '@/components/layout/TheHeader.vue';
    import { onBeforeMount } from 'vue';
    import { useAuthStore } from '@/stores/auth.js';

    const authStore = useAuthStore();
    const { autoLogin } = authStore;

    onBeforeMount(() => {
        autoLogin();
    })
</script>

<template>
    <v-app>
        <TheHeader />
        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>
