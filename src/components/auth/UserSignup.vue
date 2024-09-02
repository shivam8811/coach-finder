<script setup>
    import { ref } from 'vue';
    import BaseTextField from '@/components/ui/BaseTextField.vue';
    import BaseButton from '@/components/ui/BaseButton.vue';
    import { useAuthStore } from '@/stores/auth.js';
    import { storeToRefs } from 'pinia';
    import * as yup from 'yup';
    import { useField, useForm } from 'vee-validate';
    import ErrorMessage from '@/components/ErrorMessage.vue';

    const showSignupForm = ref(false);
    const authStore = useAuthStore();
    const { signingUp } = storeToRefs(authStore);
    const { signup } = authStore;

    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email(),
        phone: yup.string(),
        password: yup.string().required(),
        confirmPassword: yup.string().required(),
    });

    const { errors, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const { value: firstName } = useField('firstName')
    const { value: middleName } = useField('middleName')
    const { value: lastName } = useField('lastName')
    const { value: email } = useField('email')
    const { value: phone } = useField('phone')
    const { value: password } = useField('password')
    const { value: confirmPassword } = useField('confirmPassword')

    const submitForm = handleSubmit(onSuccess, onInvalidSubmit);

    function onSuccess(values) {
        console.log('submitForm');
        // signup();
    }

    function onInvalidSubmit({ values, errors, results }) {
        // console.log(values); // current form values
        // console.log(errors); // a map of field names and their first error message
        // console.log(results); // a detailed map of field names and their validation results
    }
</script>

<template>
    <div class="pa-4 text-center">
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
                            <BaseTextField label="First name*" v-model="firstName" />
                            <ErrorMessage v-if="errors.firstName" :message="errors.firstName" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <BaseTextField label="Middle name" v-model="middleName" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <BaseTextField label="Last name*" v-model="lastName" />
                            <ErrorMessage :message="errors.lastName" />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="E-Mail*"
                                type="email"
                                v-model="email"
                                prepend-inner-icon="mdi-at"
                            />
                            <ErrorMessage :message="errors.email" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Phone"
                                type="tel"
                                v-model="phone"
                                prepend-inner-icon="mdi-phone"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Password*"
                                type="password"
                                v-model="password"
                            />
                            <ErrorMessage :message="errors.password" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <BaseTextField
                                label="Confirm password*"
                                type="password"
                                v-model="confirmPassword"
                            />
                            <ErrorMessage :message="errors.confirmPassword" />
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

<style scoped>

</style>