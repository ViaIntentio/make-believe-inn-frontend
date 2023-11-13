import type { RouteRecordRaw } from "vue-router"
import Module from './module.vue';
/**
 * Pages
 */
import LoginPage from ':/auth/pages/login.page.vue';
import AuthPage from ':/auth/pages/auth.page.vue';

export const router: RouteRecordRaw[] = [
    {
        path: '/login',
        component: LoginPage,
        name: 'auth.login',
    },
    /**
     *  Use in the future ?? MAYBE.
     */
    /*
    {
        path: '/register',
        component: RegisterPage,
        name: 'auth.register',
    },
    */
    {
        path: '/auth',
        component: Module,
        children: [
            {
                path: '',
                component: AuthPage,
                name: 'auth.auth'
            }
        ]
    }
]