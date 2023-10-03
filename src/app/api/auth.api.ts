import fetch from './axios.ts'
import {IChangePassword, ICreateUser, IFirstCheckUserByEmail, ILoginUser} from "./types.ts";

const loginUser = (dto: ILoginUser) => fetch.post('/auth/login/', dto);

const refreshToken = (token: string) => fetch.post('/auth/refresh/', {
    refresh: token,
});
const checkExistUserByEmail = (dto: IFirstCheckUserByEmail) => fetch.post('/auth/sign-up-check/', dto);

const createUser = (dto: ICreateUser) => fetch.post('/auth/sign-up/', dto);

const resetPasswordByEmail = (email: string) => fetch.post('/auth/reset-password/', {
    email,
});

const sendVerifyCodeToResetPassword = (code: string) => fetch.get('/auth/verefy-code/' + code);

const changePassword = (dto: IChangePassword) => fetch.post('/auth/change-password/', dto);


export {
    loginUser,
    refreshToken,
    checkExistUserByEmail,
    createUser,
    resetPasswordByEmail,
    sendVerifyCodeToResetPassword,
    changePassword,
}