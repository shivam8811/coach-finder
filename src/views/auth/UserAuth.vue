<script setup>
    import { computed, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth.js';
    import * as yup from 'yup';
    import { useField, useForm } from 'vee-validate';
    import ErrorMessage from '@/components/ErrorMessage.vue';
    import router from '@/router/index.js';

    const authStore = useAuthStore();
    const { signup, login } = authStore;

    const mode = ref('login');
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

    const submitButtonCaption = computed(() => {
        return mode.value === 'login' ? 'Login' : 'Signup';
    })

    const switchModeButtonCaption = computed(() => {
        return mode.value === 'login' ? 'Signup instead' : 'Login instead';
    })

    const switchModeInfoCaption = computed(() => {
        return mode.value === 'login' ? "Don't have an account ?" : 'Already have an account ?';
    })

    function switchAuthMode() {
        mode.value = mode.value === 'login' ? 'signup' : 'login';
        console.log('switchAuthMode');
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
                <base-button type="submit">{{ submitButtonCaption }}</base-button>
                <small class="mt-2">{{ switchModeInfoCaption }}</small>
                <base-button @click="switchAuthMode" variant="flat">{{ switchModeButtonCaption }}</base-button>
            </div>
        </v-form>
    </v-sheet>
</template>

<style scoped>

</style>