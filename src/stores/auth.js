import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const userId = ref(null)
    const token = ref(null)
    const tokenExpiration = ref(null)
    const isAuthenticated = ref(false)

    async function login(email, password) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-1BaNg1DjyKuS2zGNmZNCcj_cXdpFez4'
        try {
            const response = await axios.post(url, {
                email,
                password,
                returnSecureToken: true,
            })
            if (response && response.data) {
                userId.value = response.data.localId
                token.value = response.data.idToken
                tokenExpiration.value = response.data.expiresIn
                isAuthenticated.value = true

                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('token', response.data.idToken)
            }
            console.log('login2: ', response.data)
            console.log('local id: ', response.data.localId)
        } catch (error) {
            console.log(error)
        }
    }

    function autoLogin() {
        const userIdLocal = localStorage.getItem('userId')
        const tokenLocal = localStorage.getItem('token')
        if (userIdLocal && tokenLocal) {
            userId.value = userIdLocal
            token.value = tokenLocal
            isAuthenticated.value = true
        }
    }

    async function signup(email, password) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-1BaNg1DjyKuS2zGNmZNCcj_cXdpFez4'
        try {
            const response = await axios.post(url, {
                email,
                password,
                returnSecureToken: true,
            })
            console.log('signup: ', response.data)
            if (response && response.data) {
                userId.value = response.data.localId
                token.value = response.data.idToken
                tokenExpiration.value = response.data.expiresIn
            }
        } catch (error) {
            console.log(error)
        }
    }
    function logout() {
        userId.value = null
        token.value = null
        isAuthenticated.value = false
    }
    return {
        isAuthenticated,
        userId,
        login,
        autoLogin,
        logout,
        signup,
    }
})
