import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const userId = ref(null)
    const token = ref(null)
    const tokenExpiration = ref(null)
    const isAuthenticated = ref(false)
    const loggingIn = ref(false)
    const signingUp = ref(false)
    let timer = null

    async function login(email, password) {
        loggingIn.value = true
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

                const expiresIn = +response.data.expiresIn * 1000
                const expirationDate = new Date().getTime() + expiresIn
                tokenExpiration.value = expirationDate
                isAuthenticated.value = true

                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('tokenExpiration', expirationDate)

                timer = setTimeout(() => {
                    logout()
                }, expiresIn)
            }
        } catch (error) {
            console.log(error)
        } finally {
            loggingIn.value = false
        }
    }

    function autoLogin() {
        const userIdLocal = localStorage.getItem('userId')
        const tokenLocal = localStorage.getItem('token')
        const tokenExpirationLocal = localStorage.getItem('tokenExpiration')
        const expiresIn = +tokenExpirationLocal - new Date().getTime()
        if (expiresIn < 0) {
            return
        }

        timer = setTimeout(() => {
            logout()
        }, expiresIn)

        if (userIdLocal && tokenLocal) {
            userId.value = userIdLocal
            token.value = tokenLocal
            isAuthenticated.value = true
        }
    }

    async function signup(email, password) {
        signingUp.value = true
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
        } finally {
            signingUp.value = false
        }
    }

    function logout() {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer)
        userId.value = null
        token.value = null
        isAuthenticated.value = false
    }

    return {
        isAuthenticated,
        userId,
        login,
        loggingIn,
        autoLogin,
        logout,
        signup,
        signingUp,
    }
})
