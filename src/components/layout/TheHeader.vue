<script setup>
    import { useAuthStore } from '@/stores/auth.js';
    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)
    const { logout } = authStore

    const items = [
        { title: 'Item 1' },
        { title: 'Item 2' },
        { title: 'Item 3' },
    ]
</script>

<template>
    <v-app-bar :elevation="4">
        <template v-slot:prepend>
            <v-btn :ripple="false" to="/">
                <v-img src="/logo.ico" width="24" height="24"></v-img>
                <span>Find your coach</span>
            </v-btn>
        </template>


        <template v-slot:append>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        icon="mdi-account-circle"
                    ></v-btn>
                </template>
                <v-list>
                    <div class="d-flex flex-column align-center">
                        <v-icon icon="mdi-account-circle"></v-icon>
                        <span>User name</span>
                    </div>
                    <v-divider class=""></v-divider>

                    <template v-if="isAuthenticated">
                        <v-list-item>
                            <base-button block link to="/requests">Requests</base-button>
                        </v-list-item>
                        <v-list-item>
                            <base-button block link to="/" @click="logout">logout</base-button>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-list-item>
                            <base-button block link to="/auth">Login</base-button>
                        </v-list-item>
                    </template>
                </v-list>

<!--                <v-card width="200" height="300">-->
<!--                    <div class="d-flex flex-column justify-center align-center">-->
<!--                        <v-icon icon="mdi-account-circle" size="80"></v-icon>-->
<!--                    </div>-->
<!--                    <template v-if="isAuthenticated">-->
<!--                        <base-button link to="/requests">Requests</base-button>-->
<!--                        <base-button link to="/" @click="logout">logout</base-button>-->
<!--                    </template>-->
<!--                    <base-button v-else link to="/auth">Login</base-button>-->
<!--                </v-card>-->

            </v-menu>
<!--            <div>-->
<!--                <base-button link to="/coaches">All Coaches</base-button>-->
<!--                <template v-if="isAuthenticated">-->
<!--                    <base-button link to="/requests">Requests</base-button>-->
<!--                    <base-button link to="/" @click="logout">logout</base-button>-->
<!--                </template>-->
<!--                <base-button v-else link to="/auth">Login</base-button>-->
<!--            </div>-->
        </template>
    </v-app-bar>
</template>

<style scoped>

</style>