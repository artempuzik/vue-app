import {App} from "vue";
import AppLayoutAuth from "./AppLayoutAuth.vue";


const layouts = [
    { name: 'app-layout-auth', component: AppLayoutAuth},
]
export default {
    install(app: App) {
        layouts.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}