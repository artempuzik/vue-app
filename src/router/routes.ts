import AppAuthPage from "../view/pages/AppAuthPage.vue";
import AppSettingPage from "../view/pages/AppSettingPage.vue";

const routes = [
    {
        path: '/',
        component: () => import("../view/pages/AppMainPage.vue"),
        name: 'Main',
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        name: 'Auth',
        children: [
            { path: 'sign-in', name: 'SignIn',  component: AppAuthPage },
            { path: 'sign-up', name: 'SignUp', component: AppAuthPage },
            { path: 'reset', name: 'ResetPassword', component: AppAuthPage },
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        component: AppSettingPage,
        meta: { requiresAuth: true },
        children: [
            { path: 'profile', name: 'Profile', component: AppSettingPage },
            { path: 'manager', name: 'Manager', component: AppSettingPage },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

export default routes;