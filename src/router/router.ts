import {createRouter, createWebHistory} from "vue-router";
import routes from "./routes.ts"
import {useAppStore} from "../store";

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const appStore = useAppStore()
    appStore.checkAuth().then(() => {
        const isAuthenticated = appStore.isAuth;
        if (requiresAuth && !isAuthenticated) {
            next('/sign-in');
        } else {
            next();
        }
    });


});

export default router;

