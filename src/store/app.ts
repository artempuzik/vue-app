import { defineStore } from 'pinia';
import useUserStore from './user.ts';
import useCompanyStore from './company.ts';
import { reactive } from 'vue';
import {authApi} from "../app/api";
import {convertRoles} from "../app/helpers";
import {ReactiveVariable} from "vue/macros";
import {IAppConfig} from "../app/api/types/types.ts";

export default defineStore('app', () => {
  const appConfig: ReactiveVariable<IAppConfig> = reactive({
    isAuth: false,
    Bearer_Auth: '',
    roles: {}
  });

  const userStore = useUserStore();
  const companyStore = useCompanyStore();

  const getRoleOptions = async () =>
      authApi.getRoleOptionsListFetch(appConfig.Bearer_Auth).then(data => {
        if (data.status === 200) {
          appConfig.roles = convertRoles(data.data)
        }
      });

  const initApp = async () => {
    return checkAuth()
      .then(data => {
        if (appConfig.Bearer_Auth) {
          companyStore.getSettings();
          getRoleOptions()
        }
        return data;
      })
      .catch(error => error);
  };
  const checkAuth = async () => {
    if (!appConfig.Bearer_Auth) {
      const storage_token = localStorage.getItem('Bearer_Auth');
      if (!storage_token) {
        return;
      }
      appConfig.Bearer_Auth = storage_token;
    }

    return userStore.checkUser()
    };
  const logOut = () => {
    appConfig.Bearer_Auth = '';
    appConfig.isAuth = false;
    localStorage.clear();
  };
  return {
    appConfig,
    initApp,
    checkAuth,
    logOut
  };
});
