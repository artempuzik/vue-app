import {defineStore} from 'pinia'
import {authApi, dashboardApi} from "../app/api";
import useUserStore from './user.ts'
import useCompanyStore from './company.ts'
import {reactive} from "vue";

export default defineStore('app', () => {
    const appConfig = reactive({
        isAuth: false,
        refreshToken: '',
        accessToken: '',
    })

    const userStore = useUserStore();
    const companyStore = useCompanyStore();

    const initApp = async () => {
        return checkAuth()
            .then((data) => {
                if(appConfig.accessToken) {
                    companyStore.getSettings(appConfig.accessToken)
                    dashboardApi.getDashboardFetch(appConfig.accessToken, {page: 1, limit: 10})
                }
                return data;
        })
            .catch((error) => error)
    }
    const checkAuth = async () => {
        if (!appConfig.accessToken) {
            const storage_token = localStorage.getItem('access_token')
            if (!storage_token) {
                return;
            }
            appConfig.accessToken = storage_token;
        }

        return userStore.checkUser()
            .catch((err) => {
                if (err.response.status === 401) {
                    if (!appConfig.refreshToken) {
                        const storage_token = localStorage.getItem('refresh_token')
                        if (!storage_token) {
                            return
                        }
                        appConfig.refreshToken = localStorage.getItem('refresh_token') || '';
                    }
                    authApi.refreshTokenFetch(appConfig.refreshToken)
                        .then((data) => {
                            if (data.status === 200) {
                                const {access, refresh} = data.data;
                                appConfig.refreshToken = refresh;
                                appConfig.accessToken = access;
                                localStorage.setItem('refresh_token', appConfig.refreshToken);
                                localStorage.setItem('access_token', appConfig.accessToken);
                                checkAuth();
                            }
                        })
                }

                appConfig.isAuth = false
            })
    }
    const logOut = () => {
        appConfig.accessToken = ''
        appConfig.refreshToken = ''
        appConfig.isAuth = false
        localStorage.clear()
    }
    return {
        appConfig,
        initApp,
        checkAuth,
        logOut,
    }
})