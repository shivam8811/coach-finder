<script setup>
    import { computed, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth.js';
    import * as yup from 'yup';
    import { useField, useForm } from 'vee-validate';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import router from '@/router/index.js';
    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore();
    const { loggingIn } = storeToRefs(authStore);
    const { signup, login } = authStore;

    const mode = ref('login');
    const dialog = ref(false);

    const schema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required(),
    });

    const { errors, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const { value: email } = useField('email')
    const { value: password } = useField('password')

    const submitForm = handleSubmit(onSuccess, onInvalidSubmit);

    function onSuccess(values) {
        if ('login' === mode.value) {
            login(email.value, password.value)
        } else {
            signup(email.value, password.value);
        }
        router.replace('/');
        console.log('submitForm');
    }

    function onInvalidSubmit({ values, errors, results }) {
        // console.log(values); // current form values
        // console.log(errors); // a map of field names and their first error message
        // console.log(results); // a detailed map of field names and their validation results
    }

    function switchAuthMode() {
        mode.value = mode.value === 'login' ? 'signup' : 'login';
    }
</script>

<template>
    <v-sheet class="mx-auto" width="300">
        <v-form @submit.prevent="submitForm">
            <div class="d-flex flex-column ga-2">
                <div>
                    <base-text-field label="Email" v-model="email" />
                    <ErrorMessage :message="errors.email" />
                </div>

                <div>
                    <base-text-field label="Password" v-model="password" />
                    <ErrorMessage :message="errors.password" />
                </div>
            </div>

            <div class="d-flex flex-column mt-5">
                <base-button type="submit" :loading="loggingIn">Login</base-button>

                <div class="pa-4 text-center">
                    <small class="mt-2">Don't have an account ?</small>
                    <v-dialog
                        v-model="dialog"
                        max-width="600"
                    >
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn
                                class="text-none font-weight-regular"
                                prepend-icon="mdi-account"
                                text="Signup instead"
                                variant="tonal"
                                v-bind="activatorProps"
                                @click="switchAuthMode"
                            ></v-btn>
                        </template>

                        <v-card
                            prepend-icon="mdi-account"
                            title="User Profile"
                        >
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            hint="example of helper text only on focus"
                                            label="Middle name"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            hint="example of helper text only on focus"
                                            label="Middle name"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            hint="example of helper text only on focus"
                                            label="Middle name"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            hint="example of helper text only on focus"
                                            label="Middle name"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <small class="text-caption text-medium-emphasis">*indicates required field</small>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    text="Close"
                                    variant="plain"
                                    @click="dialog = false"
                                ></v-btn>

                                <v-btn
                                    color="primary"
                                    text="Signup"
                                    variant="tonal"
                                    @click="dialog = false"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </v-form>
    </v-sheet>
</template>

<style scoped>

</style>