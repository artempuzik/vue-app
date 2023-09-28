import {App} from "vue";
import AppLayoutSettings from "./layout/AppLayoutSettings.vue";
import AppSettingsSettings from "./AppSettingsSettings.vue";
import AppSettingsProfile from "./AppSettingsProfile.vue";
import AppSettingsManager from "./AppSettingsManager.vue";


const component = [
    { name: 'app-layout-settings', component: AppLayoutSettings},
    { name: 'app-settings-settings', component: AppSettingsSettings},
    { name: 'app-settings-profile', component: AppSettingsProfile},
    { name: 'app-settings-manager', component: AppSettingsManager},
]
export default {
    install(app: App) {
        component.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}