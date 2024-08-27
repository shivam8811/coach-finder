<script setup>
    import BaseButton from '@/components/ui/BaseButton.vue';
    import axios from 'axios';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        id: String,
    })
    onMounted(() => {
        console.log('coach id', props.id)
    })

    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email(),
        message: yup.string(),
    });

    const { errors, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const { value: firstName } = useField('firstName')
    const { value: lastName } = useField('lastName')
    const { value: email } = useField('email')
    const { value: message } = useField('message')

    const submitForm = handleSubmit(onSuccess, onInvalidSubmit);

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
            router.replace('/');
        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    function onInvalidSubmit({ values, errors, results }) {
        // console.log(values); // current form values
        // console.log(errors); // a map of field names and their first error message
        // console.log(results); // a detailed map of field names and their validation results
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
                    <BaseTextField v-model.trim="firstName" label="First name*" />
                    <ErrorMessage :message="errors.firstName" />
                </v-col>

                <v-col cols="12" md="6">
                    <BaseTextField v-model.trim="lastName" label="Last name*" />
                    <ErrorMessage :message="errors.lastName" />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <BaseTextField v-model="email" label="E-Mail*" />
                    <ErrorMessage :message="errors.email" />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-textarea
                        v-model="message"
                        label="Description"
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