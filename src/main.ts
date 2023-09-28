import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.scss'

import router from "./router/router.ts"

import auth from './view/components/auth'
import settings from './view/components/settings'
import UI from './view/UI'
import App from './App.vue'

const app = createApp(App)
    app.use(auth)
    app.use(settings)
    app.use(UI)
    app.use(router)
    app.mount('#app')
