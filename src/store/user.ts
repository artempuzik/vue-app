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
import {useRouter} from "vue-router";

const initUser = {
  user_id: 0,
  isAdmin: false,
  name: '',
  surname: '',
  email: '',
}

export default defineStore('user', () => {
  let user = reactive({...initUser});
  const router = useRouter();
  const appStore = useAppStore();
  const companyStore = useCompanyStore();
  const checkUser = async () => {
    appStore.isLoading = true
    return authApi.checkUserFetch(appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        const {name, surname} = data.data;
        user.name = name;
        user.surname = surname;
        appStore.appConfig.isAuth = true;
      }
      return data;
    })
    .then(async (data) => {
      await appStore.getOptions()
      appStore.isLoading = false
      return data
    })
    .catch(() => {
      appStore.appConfig.isAuth = false;
      appStore.isLoading = false
      router.push('sign-in')
    })
  }

  const setAuth = async ({ user_id, company_id, Bearer_Auth }: IUserResponse) => {
    appStore.appConfig.isAuth = true;
    companyStore.company.id = company_id;
    user.user_id = user_id;
    appStore.appConfig.Bearer_Auth = Bearer_Auth;
    localStorage.setItem('Bearer_Auth', Bearer_Auth);
    await appStore.getOptions()
    await router.replace('main');
  }

  const loginUser = (dto: ILoginUser) =>  authApi.loginUserFetch(dto).then(async (data) => {
      if (data.status === 200) {
        appStore.isLoading = true
        await setAuth(data.data)
        await checkUser()
      }
    })
  const checkExistUserByEmail = async (dto: IFirstCheckUserByEmail) => {
    return authApi.checkExistUserByEmailFetch(dto).then(data => {
      if (data.status === 200) {
        appStore.appConfig.Bearer_Auth = data.data.Bearer_Auth;
      }
      return data;
    })
  };
  const createUser = async (dto: ICreateUser) => {
    return authApi.createUserFetch(dto).then(async (data) => {
      if (data.status === 200) {
        appStore.isLoading = true
        await setAuth(data.data)
        await checkUser()
      }
      return data;
    });
  };
  const resetPasswordByEmail = async (email: string) => authApi.resetPasswordByEmailFetch(email);
  const sendVerifyCodeToResetPassword = (email: string, code: string) => authApi.sendVerifyCodeToResetPasswordFetch(email, code).then((response) => {
      if(response.status === 200) {
        user.user_id = response.data.user_id;
        appStore.appConfig.Bearer_Auth = response.data.Bearer_Auth;
      }
      return response;
  });
  const changeUserPassword = async (dto: IChangePassword) => {
    return authApi.changePasswordFetch(dto, appStore.appConfig.Bearer_Auth).then(data => {
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

  const clearUser = () => {
    user = Object.assign(user, initUser)
  }

  return {
    user,
    clearUser,
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
