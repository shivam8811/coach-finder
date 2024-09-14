<script setup>
    import BaseButton from '@/components/ui/BaseButton.vue';
    import axios from 'axios';
    import * as yup from 'yup';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { errorMessages } from '@/config/errorMessages.js';
    import { useFormHandler } from '@/composables/formHandler.js';
    import { useSnackbarStore } from '@/stores/snackbar.js';

    const router = useRouter();

    const props = defineProps({
        id: String,
    })

    const snackbarStore = useSnackbarStore();
    const { showSnackbar } = snackbarStore;

    const schema = yup.object({
        firstName: yup.string().required(errorMessages.required('First name')),
        lastName: yup.string().required(errorMessages.required('Last name')),
        email: yup.string().required(errorMessages.required('Email')).email(),
        message: yup.string(),
    });

    const { fields, errors, submitForm } = useFormHandler(schema, onSuccess, onInvalidSubmit);

    async function onSuccess(values) {
        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            message: values.message,
        }

        const data = {
            ...formData,
        }

        try {
            const response = await axios.put(`https://coach-finder-3a531-default-rtdb.europe-west1.firebasedatabase.app/requests/${ props.id }.json`, data)
            console.log('success', response.data)
            showSnackbar('Thank you for contacting coach.', 'success');
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
    <v-form @submit.prevent="submitForm">
        <v-container>
            <v-row>
                <v-col>
                    <h2>Contact Coach</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <BaseTextField v-model.trim="fields.firstName" label="First name*" />
                    <ErrorMessage :message="errors.firstName" />
                </v-col>

                <v-col cols="12" md="6">
                    <BaseTextField v-model.trim="fields.lastName" label="Last name*" />
                    <ErrorMessage :message="errors.lastName" />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <BaseTextField v-model="fields.email" label="E-Mail*" />
                    <ErrorMessage :message="errors.email" />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-textarea
                        v-model="fields.message"
                        label="Message"
                        variant="outlined"
                        hide-details
                    ></v-textarea>
                    <ErrorMessage :message="errors.message" />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex justify-end">
                    <base-button type="submit">
                        Send message
                    </base-button>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>