import {App} from "vue";
import AppUiButton from "./AppUiButton.vue";
import AppUiInput from "./AppUiInput.vue";
import AppUiAuthInput from "./AppUiAuthInput.vue";


const components = [
    { name: 'app-ui-button', component: AppUiButton},
    { name: 'app-ui-input', component: AppUiInput},
    { name: 'app-ui-auth-input', component: AppUiAuthInput},
]
export default {
    install(app: App) {
        components.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}