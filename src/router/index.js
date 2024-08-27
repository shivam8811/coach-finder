import { createRouter, createWebHistory } from 'vue-router'
import CoachesListView from '@/views/coaches/CoachesListView.vue';
import CoachDetailView from '@/views/coaches/CoachDetailView.vue';
import ContactCoachView from '@/views/requests/ContactCoachView.vue';
import RequestsReceivedView from '@/views/requests/RequestsReceivedView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import CoachRegistrationView from '@/views/coaches/CoachRegistrationView.vue';
import UserAuth from '@/views/auth/UserAuth.vue';
import { useAuthStore } from '@/stores/auth.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/coaches',
        },
        {
            path: '/coaches',
            name: 'coaches',
            // component: () => import('../views/AboutView.vue')
            component: CoachesListView,
        },
        {
            path: '/coaches/:id',
            component: CoachDetailView,
            props: true,
            children: [
                {
                    path: 'contact',
                    name: 'contact',
                    component: ContactCoachView,
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: CoachRegistrationView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/requests',
            name: 'requests',
            component: RequestsReceivedView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/auth',
            name: 'auth',
            component: UserAuth,
            meta: {
                requiresUnauth: true,
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFoundView,
        },
    ]
})

router.beforeEach((to, from) => {
    if (!useAuthStore().isAuthenticated && to.meta.requiresAuth) {
        return '/auth'
    }
    if (useAuthStore().isAuthenticated && to.meta.requiresUnauth) {
        return '/coaches'
    }
})

export default router
