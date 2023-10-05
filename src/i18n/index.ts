import { createI18n } from "vue-i18n";

const messages = {
    en: {
        header: {
            nav_dashboard: "Dashboard",
        },
    },
    pl: {
        header: {
            nav_dashboard: "Panel",
        },
    },
    de: {
        header: {
            nav_dashboard: "Armaturenbrett",
        },
    },
    esp: {
        header: {
            nav_dashboard: "Panel",
        },
    },
}

export default createI18n({
    locale: "en",
    fallbackLocale: "en",
    legacy: false,
    messages,
})