import fetch from './axios.ts'
import {ICreateUser, IFirstCheckUserByEmail, ILoginUser} from "./types.ts";

const loginUser = (dto: ILoginUser) => fetch.post('/auth/login/', dto);
const checkExistUserByEmail = (dto: IFirstCheckUserByEmail) => fetch.post('/auth/sign-up-check/', data);

const createUser = (dto: ICreateUser) => fetch.post('/auth/sign-up/', data);


export {
    loginUser,
    checkExistUserByEmail,
    createUser,
}