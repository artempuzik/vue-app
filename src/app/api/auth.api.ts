import fetch from './axios.ts'
import {IChangePassword, ICreateUser, IFirstCheckUserByEmail, ILoginUser} from "./types/types.ts";

const loginUserFetch = (dto: ILoginUser) => fetch.post('/auth/login/', dto);

const refreshTokenFetch = (token: string) => fetch.post('/auth/refresh/', {
    refresh: token,
});
const checkExistUserByEmailFetch = (dto: IFirstCheckUserByEmail) => fetch.post('/auth/sign-up-check/', dto);

const createUserFetch = (dto: ICreateUser) => fetch.post('/auth/sign-up/', dto);

const resetPasswordByEmailFetch = (email: string) => fetch.post('/auth/reset-password/', {
    email,
});

const sendVerifyCodeToResetPasswordFetch = (code: string) => fetch.get('/auth/verefy-code/' + code);

const changePasswordFetch = (dto: IChangePassword) => fetch.post('/auth/change-password/', dto);


export {
    loginUserFetch,
    refreshTokenFetch,
    checkExistUserByEmailFetch,
    createUserFetch,
    resetPasswordByEmailFetch,
    sendVerifyCodeToResetPasswordFetch,
    changePasswordFetch,
}