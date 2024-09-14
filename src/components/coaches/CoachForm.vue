<script setup>
    import BaseButton from '@/components/ui/BaseButton.vue';
    import axios from 'axios';
    import * as yup from 'yup';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import { useAuthStore } from '@/stores/auth.js';
    import { storeToRefs } from 'pinia';
    import { errorMessages } from '@/config/errorMessages.js';
    import { useFormHandler } from '@/composables/formHandler.js';
    import { useSnackbarStore } from '@/stores/snackbar.js';
    import router from '@/router/index.js';

    const areasAvailable = ['frontend', 'backend', 'carrier'];

    const { userId } = storeToRefs(useAuthStore())

    const snackbarStore = useSnackbarStore();
    const { showSnackbar } = snackbarStore;

    const schema = yup.object({
        firstName: yup.string().required(errorMessages.required('First name')),
        lastName: yup.string().required(errorMessages.required('Last name')),
        description: yup.string().required(errorMessages.required('Description')),
        hourlyRate: yup.number()
            .typeError(errorMessages.type.number)
            .required(errorMessages.required('Hourly rate')),
        areas: yup.array()
            .required(errorMessages.required('Areas of expertise'))
            .min(1, errorMessages.required('At least one area of expertise is required', true)),
    });

    const { fields, errors, submitForm } = useFormHandler(schema, onSuccess, onInvalidSubmit);

    async function onSuccess(values) {
        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            description: values.description,
            hourlyRate: values.hourlyRate,
            areas: values.areas,
        }

        console.log('user id store', userId.value)

        const data = {
            ...formData,
        }

        try {
            const response = await axios.put(`https://coach-finder-3a531-default-rtdb.europe-west1.firebasedatabase.app/coaches/${ userId.value }.json`, data)
            console.log('success', response.data)
            await router.replace('/');
            showSnackbar('You are successfully registered as a coach', 'success');
        } catch (error) {
            showSnackbar(error, 'error');
        }
    }

    function onInvalidSubmit({ values, errors, results }) {
        console.log('user id store', userId)
        console.log(values); // current form values
        console.log(errors); // a map of field names and their first error message
        console.log(results); // a detailed map of field names and their validation results
    }
</script>

<template>
    <v-form @submit.prevent="submitForm">
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <BaseTextField v-model.trim="fields.firstName" label="First name*" />
                    <ErrorMessage v-if="errors.firstName" :message="errors.firstName" />
                </v-col>

                <v-col cols="12" md="6">
                    <BaseTextField v-model.trim="fields.lastName" label="Last name*" />
                    <ErrorMessage v-if="errors.lastName" :message="errors.lastName" />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-textarea
                        v-model="fields.description"
                        label="Description"
                        variant="outlined"
                        hide-details
                    ></v-textarea>
                    <ErrorMessage v-if="errors.description" :message="errors.description" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <BaseTextField
                        v-model.trim="fields.hourlyRate"
                        type="number"
                        label="Hourly rate*"
                        append-inner-icon="mdi-currency-eur"
                        step="0.01"
                        hide-spin-buttons
                    />
                    <ErrorMessage v-if="errors.hourlyRate" :message="errors.hourlyRate" />
                </v-col>

                <v-col cols="12" md="6">
                    <v-select
                        :items="areasAvailable"
                        v-model="fields.areas"
                        label="Areas of expertise"
                        variant="outlined"
                        hide-details="auto"
                        chips
                        multiple
                    ></v-select>
                    <ErrorMessage v-if="errors.areas" :message="errors.areas" />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex justify-end">
                    <base-button type="submit">
                        Submit
                    </base-button>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>