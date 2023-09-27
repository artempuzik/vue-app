import {App} from "vue";
import AppUiButton from "./AppUiButton.vue";
import AppUiAuthInput from "./AppUiAuthInput.vue";
import AppUiSelect from "./AppUiSelect.vue";
import AppUiInput from "./AppUiInput.vue";
import AppUiSpinner from "./AppUiSpinner.vue";


const components = [
    { name: 'app-ui-button', component: AppUiButton},
    { name: 'app-ui-input', component: AppUiInput},
    { name: 'app-ui-auth-input', component: AppUiAuthInput},
    { name: 'app-ui-select', component: AppUiSelect},
    { name: 'app-ui-spinner', component: AppUiSpinner},
]
export default {
    install(app: App) {
        components.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}