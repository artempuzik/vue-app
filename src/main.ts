import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.scss'

import router from "./router/router.ts"

import auth from './view/components/auth'
import UI from './view/UI'
import App from './App.vue'

const app = createApp(App)
    app.use(auth)
    app.use(UI)
    app.use(router)
    app.mount('#app')
