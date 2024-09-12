<script setup>
    import { useAuthStore } from '@/stores/auth.js';
    import * as yup from 'yup';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import router from '@/router/index.js';
    import { storeToRefs } from 'pinia';
    import UserSignup from '@/components/auth/UserSignup.vue';
    import { useFormHandler } from '@/composables/formHandler.js';
    import { errorMessages } from '@/config/errorMessages.js';
    import { useSnackbarStore } from '@/stores/snackbar.js';

    const authStore = useAuthStore();
    const { isLoggingIn } = storeToRefs(authStore);
    const { login } = authStore;

    const snackbarStore = useSnackbarStore();
    const { showSnackbar } = snackbarStore;

    const schema = yup.object({
        email: yup.string().required(errorMessages.required).email(errorMessages.type.email),
        password: yup.string().required(errorMessages.required),
    });

    const { fields, errors, submitForm } = useFormHandler(schema, onSuccess, onInvalidSubmit);

    async function onSuccess(values) {
        try {
            const response = await login(values.email, values.password)
            console.log('success', response);
            showSnackbar('You are successfully logged in', 'success');
            await router.replace('/');
        } catch (error) {
            showSnackbar(error, 'error');
        }
    }

    function onInvalidSubmit({ values, errors, results }) {
        console.log(values); // current form values
        console.log(errors); // a map of field names and their first error message
        console.log(results); // a detailed map of field names and their validation results
    }
</script>

<template>
    <v-sheet class="mx-auto" width="300">
        <v-form @submit.prevent="submitForm">
            <div class="d-flex flex-column ga-2">
                <div>
                    <BaseTextField
                        label="Email"
                        type="email"
                        v-model="fields['email']"
                    />
                    <ErrorMessage v-if="errors.email" :message="errors.email" />
                </div>

                <div>
                    <BaseTextField
                        label="Password"
                        type="password"
                        v-model="fields['password']"
                    />
                    <ErrorMessage v-if="errors.password" :message="errors.password" />
                </div>
            </div>

            <div class="d-flex flex-column mt-5">
                <BaseButton
                    type="submit"
                    text="Login"
                    :loading="isLoggingIn"
                />
                <UserSignup />
            </div>
        </v-form>
    </v-sheet>
</template>