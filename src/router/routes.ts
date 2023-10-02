import AppAuthSignIn from "../view/auth/pages/AppAuthSignIn.vue";
import AppAuthSignUp from "../view/auth/pages/AppAuthSignUp.vue";
import AppAuthReset from "../view/auth/pages/AppAuthReset.vue";
import AppSettingsSettings from "../view/settings/pages/AppSettingsSettings.vue";
import AppSettingsProfile from "../view/settings/pages/AppSettingsProfile.vue";
import AppSettingsManager from "../view/settings/pages/AppSettingsManager.vue";


const routes = [
    {
        path: '/',
        component: () => import("../view/main/AppMainPage.vue"),
        name: 'Main',
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        name: 'Auth',
        redirect: 'auth/sign-in',
        children: [
            { path: 'sign-in', name: 'SignIn',  component: AppAuthSignIn },
            { path: 'sign-up', name: 'SignUp', component: AppAuthSignUp },
            { path: 'reset', name: 'ResetPassword', component: AppAuthReset },
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: { requiresAuth: true },
        children: [
            { path: 'settings', name: 'Settings',  component: AppSettingsSettings },
            { path: 'profile', name: 'Profile', component: AppSettingsProfile },
            { path: 'manager', name: 'Manager', component: AppSettingsManager },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

export default routes;