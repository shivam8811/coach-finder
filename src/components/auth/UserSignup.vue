<script setup>
import { reactive, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth.js';
    import { storeToRefs } from 'pinia';
    import * as yup from 'yup';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import { useFormHandler } from '@/composables/formHandler.js';
    import { errorMessages } from '@/config/errorMessages.js';
    import { useSnackbarStore } from '@/stores/snackbar.js';

    const showSignupForm = ref(false);

    const authStore = useAuthStore();
    const { signingUp } = storeToRefs(authStore);
    const { signup } = authStore;

    const snackbarStore = useSnackbarStore();
    const { showSnackbar } = snackbarStore;
    const { snackbar } = storeToRefs(snackbarStore);

    const schema = yup.object({
        firstName: yup.string().required(errorMessages.required('First name')),
        middleName: yup.string(),
        lastName: yup.string().required(errorMessages.required('Last name')),
        email: yup.string().required(errorMessages.required).email(errorMessages.type.email),
        phone: yup.string(),
        password: yup.string().required(errorMessages.required('Password')),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required(errorMessages.required('Please confirm password', true)),
    });
    const { fields, errors, submitForm } = useFormHandler(schema, onSuccess, onInvalidSubmit);

    async function onSuccess(values) {
        console.log('submitForm', values);
        try {
            const data = await signup(values);
            console.log('success', data);
            showSnackbar('Signup successful. You can now login.', 'success');
        } catch (error) {
            showSnackbar(error, 'error');
        } finally {
            showSignupForm.value = false;
        }
    }

    function onInvalidSubmit({ values, errors, results }) {
        console.log('errors:::'); // current form values
        console.log(values); // current form values
        console.log(errors); // a map of field names and their first error message
        console.log(results); // a detailed map of field names and their validation results
    }
</script>

<template>
    <div class="pa-4 text-center">
        <v-snackbar
            v-model="snackbar.visible"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
        >
            {{ snackbar.message }}
        </v-snackbar>

        <small class="mt-2">Don't have an account ?</small>
        <v-dialog
            v-model="showSignupForm"
            max-width="600"
        >
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    class="text-none font-weight-regular"
                    prepend-icon="mdi-account"
                    text="Signup instead"
                    variant="tonal"
                    v-bind="activatorProps"
                ></v-btn>
            </template>

            <v-card
                prepend-icon="mdi-account"
                title="User Signup"
            >
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="4">
                            <BaseTextField label="First name*" v-model.trim="fields['firstName']" />
                            <ErrorMessage v-if="errors.firstName" :message="errors.firstName" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <BaseTextField label="Middle name" v-model.trim="fields['middleName']" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <BaseTextField label="Last name*" v-model.trim="fields['lastName']" />
                            <ErrorMessage v-if="errors.lastName" :message="errors.lastName" />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="E-Mail*"
                                type="email"
                                v-model.trim="fields['email']"
                                prepend-inner-icon="mdi-at"
                            />
                            <ErrorMessage v-if="errors.email" :message="errors.email" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Phone"
                                type="tel"
                                v-model.trim="fields['phone']"
                                prepend-inner-icon="mdi-phone"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Password*"
                                type="password"
                                v-model="fields['password']"
                            />
                            <ErrorMessage v-if="errors.password" :message="errors.password" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Confirm password*"
                                type="password"
                                v-model="fields['confirmPassword']"
                            />
                            <ErrorMessage v-if="errors.confirmPassword" :message="errors.confirmPassword" />
                        </v-col>
                    </v-row>
                    <small class="text-caption text-medium-emphasis">*indicates required field</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <BaseButton
                        @click="showSignupForm = false"
                        text="Close"
                        prepend-icon="mdi-close"
                        color="black"
                        variant="tonal"
                        style="background: white"
                    />

                    <BaseButton
                        @click="submitForm"
                        text="Signup"
                        :loading="signingUp"
                        prepend-icon="mdi-check"
                    />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>