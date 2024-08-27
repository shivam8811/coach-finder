<script setup>
    import { useAuthStore } from '@/stores/auth.js';
    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)
    const { logout } = authStore
</script>

<template>
    <v-app-bar :elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Find your coach</v-app-bar-title>

        <template v-slot:append>
            <div>
                <base-button link to="/coaches">All Coaches</base-button>
                <template v-if="isAuthenticated">
                    <base-button link to="/requests">Requests</base-button>
                    <base-button link to="/" @click="logout">logout</base-button>
                </template>
                <base-button v-else link to="/auth">Login</base-button>
            </div>
        </template>
    </v-app-bar>
</template>

<style scoped>

</style>