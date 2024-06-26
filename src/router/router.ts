import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.ts';
import { useAppStore } from '../store';

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active_tab',
  routes
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const appStore = useAppStore();
  const isAuthenticated = appStore.appConfig.isAuth;
  if (requiresAuth && !isAuthenticated) {
    next('/sign-in');
  } else {
    next();
  }
});

export default router;
