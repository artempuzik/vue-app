import {defineStore} from 'pinia'
import {checkUser} from "../app/api/user.api.ts";
import {
    checkExistUserByEmail,
    createUser,
    loginUser,
    refreshToken,
    resetPasswordByEmail,
    sendVerifyCodeToResetPassword,
    changePassword
} from "../app/api/auth.api.ts";
import {
    IChangePassword,
    ICheckUserResponse,
    ICreateUser,
    IFirstCheckUserByEmail,
    ILoginUser,
    IUserResponse
} from "../app/api/types.ts";

const initAppStore = {
    isAuth: false,
    id: '',
    isAdmin: false,
    refreshToken: '',
    accessToken: '',
    email: '',
    firstName: '',
    lastName: '',
    isStaff: false,
    isConfirmed: false,
    isActive: false,
    isCompanyAdmin: false,
    inConsideration: false,
    company: '',
    avatar: null,
}

export default defineStore('app', {
    state: () => ({...initAppStore}),
    actions: {
        async checkAuth() {
            if (!this.accessToken) {
                const storage_token = localStorage.getItem('access_token')
                if (!storage_token) {
                    return;
                }
                this.accessToken = storage_token;
            }

            return checkUser(this.accessToken)
                .then(data => {
                    if (data.status === 200) {
                        const {
                            avatar,
                            company,
                            email,
                            first_name,
                            id,
                            in_consideration,
                            is_active,
                            is_company_admin,
                            is_confirmed,
                            is_staff,
                            last_name,
                        } = data.data as ICheckUserResponse;
                        this.avatar = avatar ? avatar : null;
                        this.company = company;
                        this.email = email;
                        this.firstName = first_name;
                        this.lastName = last_name;
                        this.email = email;
                        this.id = id;
                        this.inConsideration = in_consideration;
                        this.isActive = is_active;
                        this.isCompanyAdmin = is_company_admin;
                        this.isConfirmed = is_confirmed;
                        this.isStaff = is_staff;
                        this.isAuth = true;
                    }
                })
                .catch((err) => {
                    if(err.response.status === 401) {
                        if (!this.refreshToken) {
                            const storage_token = localStorage.getItem('refresh_token')
                            if(!storage_token) {
                                return
                            }
                            this.refreshToken = localStorage.getItem('refresh_token') || '';
                        }
                        refreshToken(this.refreshToken).then((data) => {
                            if(data.status === 200) {
                                const {access, refresh} = data.data;
                                this.refreshToken = refresh;
                                this.accessToken = access;
                                localStorage.setItem('refresh_token', this.refreshToken);
                                localStorage.setItem('access_token', this.accessToken);
                                this.checkAuth();
                            }
                        })
                    }

                    this.isAuth = false
                })
        },
        async loginUser(dto: ILoginUser) {
            return loginUser(dto)
                .then((data) => {
                    if (data.status === 200) {
                        const {
                            id_user,
                            access,
                            refresh,
                            is_admin
                        } = data.data as IUserResponse;
                        this.isAuth = true;
                        this.id = id_user;
                        this.refreshToken = refresh;
                        this.accessToken = access;
                        this.isAdmin = is_admin;
                        localStorage.setItem('refresh_token', this.refreshToken);
                        localStorage.setItem('access_token', this.accessToken);
                    }
                })
                .catch(() => this.isAuth = false)
        },
        async checkExistUserByEmail(dto: IFirstCheckUserByEmail) {
            return checkExistUserByEmail(dto)
                .then((data) => {
                    if (data.status === 200) {
                        this.id = data.data.id_user;
                    }
                    return data
                })
        },
        async createUser(dto: ICreateUser) {
            return createUser(dto)
                .then((data) => {
                    if (data.status === 200) {
                        this.id = data.data.id_user;
                    }
                    return data
                })
        },
        async resetPasswordByEmail(email: string) {
            return resetPasswordByEmail(email)
        },
        async sendVerifyCodeToResetPassword(code: string) {
            return sendVerifyCodeToResetPassword(code)
        },
        async changePassword(dto: IChangePassword) {
            return changePassword(dto).then((data) => {
                if (data.status === 200) {
                    this.isAuth = true
                }
                return data
            })
        },
        logOut() {
            this.$reset()
        }
    },
    getters: {
        getAuthStatus: (state) => state.isAuth
    },
})