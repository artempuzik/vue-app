import { defineStore } from 'pinia';
import { authApi } from '../app/api';
import useAppStore from './app.ts';
import useCompanyStore from './company.ts';
import {
  IChangePassword,
  IChangeUserPassword,
  ICreateUser,
  IFirstCheckUserByEmail,
  ILoginUser, IUpdateMember,
  IUser,
  IUserResponse
} from '../app/api/types/types.ts';
import { reactive } from 'vue';

export default defineStore('user', () => {
  const user = reactive({
    user_id: 0,
    isAdmin: false,
    name: '',
    surname: '',
    email: '',
  });
  const appStore = useAppStore();
  const companyStore = useCompanyStore();
  const checkUser = async () =>
      authApi.checkUserFetch(appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        const { name, surname } = data.data;
        user.name = name;
        user.surname = surname;
        appStore.appConfig.isAuth = true;
      }
      return data;
    });

  const loginUser = (dto: ILoginUser) =>
    authApi.loginUserFetch(dto).then(data => {
      if (data.status === 200) {
        const { user_id, company_id, Bearer_Auth } = data.data as IUserResponse;
        appStore.appConfig.isAuth = true;
        companyStore.company.id = company_id;
        user.user_id = user_id;
        appStore.appConfig.Bearer_Auth = Bearer_Auth;
        localStorage.setItem('Bearer_Auth', Bearer_Auth);
      }
    });
  const checkExistUserByEmail = async (dto: IFirstCheckUserByEmail) => {
    return authApi.checkExistUserByEmailFetch(dto).then(data => {
      if (data.status === 200) {
        user.user_id = data.data.user_id;
      }
      return data;
    });
  };
  const createUser = async (dto: ICreateUser) => {
    return authApi.createUserFetch(dto).then(data => {
      if (data.status === 200) {
        user.user_id = data.data.user_id;
      }
      return data;
    });
  };
  const resetPasswordByEmail = async (email: string) => authApi.resetPasswordByEmailFetch(email);
  const sendVerifyCodeToResetPassword = (email: string, code: string) => authApi.sendVerifyCodeToResetPasswordFetch(email, code);
  const changeUserPassword = async (dto: IChangePassword) => {
    return authApi.changePasswordFetch(dto).then(data => {
      if (data.status === 200) {
        appStore.appConfig.isAuth = true;
      }
      return data;
    });
  };
  const changeProfilePassword = async (dto: IChangeUserPassword) => authApi.changeProfilePasswordFetch(dto, appStore.appConfig.Bearer_Auth);

  const updateUser = async (dto: Partial<IUser>) =>
      authApi.updateUserFetch(dto, appStore.appConfig.Bearer_Auth)
          .then((response) => {
          if(response.status === 200) {
            user.name = response.data.name;
            user.surname = response.data.surname;
          }
  });

  const updateMemberById = (id: string, dto: IUpdateMember) =>
      authApi.updateMemberFetch(dto, id, appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        const idx = companyStore.companyMembers.findIndex(member => member.user_id === id);
        if (idx !== -1) {
          companyStore.companyMembers[idx] = {
            ...companyStore.companyMembers[idx],
            ...dto
          };
        }
      }
    });

  return {
    user,
    checkUser,
    loginUser,
    updateUser,
    createUser,
    changeUserPassword,
    checkExistUserByEmail,
    changeProfilePassword,
    sendVerifyCodeToResetPassword,
    resetPasswordByEmail,
    updateMemberById,
  };
});
