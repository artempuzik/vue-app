import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'

import UI from './view/UI'
import App from './App.vue'

const app = createApp(App)
    app.use(UI)
    app.mount('#app')
