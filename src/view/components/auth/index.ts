import {App} from "vue";
import AppStaticAuth from "./layout/AppStaticAuth.vue";
import AppLayoutAuth from "./layout/AppLayoutAuth.vue";
import AppAuthSignIn from "./AppAuthSignIn.vue";
import AppAuthSignUp from "./AppAuthSignUp.vue";
import AppAuthReset from "./AppAuthReset.vue";


const component = [
    { name: 'app-auth-sign-in', component: AppAuthSignIn},
    { name: 'app-auth-sign-up', component: AppAuthSignUp},
    { name: 'app-auth-reset', component: AppAuthReset},
    { name: 'app-static-auth', component: AppStaticAuth},
    { name: 'app-layout-auth', component: AppLayoutAuth},
]
export default {
    install(app: App) {
        component.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}