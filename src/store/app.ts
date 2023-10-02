import {defineStore} from 'pinia'
import {checkUser} from "../app/api/user.api.ts";
import {loginUser} from "../app/api/auth.api.ts";
import {ILoginUser} from "../app/api/types.ts";

export default defineStore('app', {
    state: () => ({
        isAuth: false,
        id: '',
        refreshToken: '',
        accessToken: '',
        firstName: '',
        lastName: '',
    }),
    actions: {
        checkAuth() {
            checkUser(this.accessToken)
                .then(data => console.log('-----', data))
                .catch(() => this.isAuth = false)
        },
        loginUser(dto: ILoginUser) {
            console.log('loginUser', dto)
            return loginUser(dto).then(data => console.log(data))
        },
    },
    // getters: {
    //     getAuthStatus: (state) => state.isAuth
    // }
})