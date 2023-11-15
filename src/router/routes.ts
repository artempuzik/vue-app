import AppMainDashboard from "../view/main/AppMainDashboard.vue";

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    name: 'main',
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: AppMainDashboard,
    name: 'dashboard',
    meta: { requiresAuth: true }
  },
  {
    path: '/list',
    component: () => import('../view/list/pages/AppProductList.vue'),
    name: 'list',
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    component: () => import('../view/product/pages/AppProduct.vue'),
    name: 'product',
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    component: () => import('../view/history/pages/AppHistory.vue'),
    name: 'history',
    meta: { requiresAuth: true }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../view/auth/pages/AppAuthSignIn.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../view/auth/pages/AppAuthSignUp.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../view/auth/pages/AppAuthReset.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../view/settings/pages/AppSettingsSettings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../view/settings/pages/AppSettingsProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../view/settings/pages/AppSettingsManager.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

export default routes;
