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
        component: AppSettingPage,
        name: 'Settings',
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

export default routes;