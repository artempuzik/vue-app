import AppAuthPage from "../view/pages/AppAuthPage.vue";
import AppMainPage from "../view/pages/AppMainPage.vue";
import AppSettingPage from "../view/pages/AppSettingPage.vue";

const routes = [
    {
        path: '/',
        component: AppMainPage,
        name: 'Main',
        meta: { requiresAuth: true } },
    {
        path: '/auth',
        component: AppAuthPage,
        name: 'Auth'
    },
    {
        path: '/settings',
        component: AppSettingPage,
        name: 'Settings',
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: to => '/'
    },
]

export default routes;