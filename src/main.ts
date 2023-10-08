import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';

import router from './router/router.ts';

import UI from './view/UI';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(UI);
app.use(router);
app.mount('#app');
