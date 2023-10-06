import AppAuthSignIn from "../view/auth/pages/AppAuthSignIn.vue";
import AppAuthSignUp from "../view/auth/pages/AppAuthSignUp.vue";
import AppAuthReset from "../view/auth/pages/AppAuthReset.vue";
import AppSettingsSettings from "../view/settings/pages/AppSettingsSettings.vue";
import AppSettingsProfile from "../view/settings/pages/AppSettingsProfile.vue";
import AppSettingsManager from "../view/settings/pages/AppSettingsManager.vue";


const routes = [
    {
        path: '/',
        redirect: 'dashboard',
        name: 'main',
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        component: () => import("../view/main/AppMainDashboard.vue"),
        name: 'dashboard',
        meta: { requiresAuth: true }
    },
    {
        path: '/list',
        component: () => import("../view/main/AppMainList.vue"),
        name: 'list',
        meta: { requiresAuth: true }
    },
    {
        path: '/history',
        component: () => import("../view/main/AppMainHistory.vue"),
        name: 'history',
        meta: { requiresAuth: true }
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: AppAuthSignIn,
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: AppAuthSignUp,
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: AppAuthReset,
    },
    {
        path: '/settings',
        name: 'settings',
        component: AppSettingsSettings,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: AppSettingsProfile,
        meta: { requiresAuth: true },
    },
    {
        path: '/manager',
        name: 'manager',
        component: AppSettingsManager,
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

export default routes;