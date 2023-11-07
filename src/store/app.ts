import { defineStore } from 'pinia';
import useUserStore from './user.ts';
import useCompanyStore from './company.ts';
import {reactive, ref, Ref, watch} from 'vue';
import {authApi} from "../app/api";
import {convertRoles, mapOptions} from "../app/helpers";
import {ReactiveVariable} from "vue/macros";
import {IAppConfig, IAppSettings, ICompanySettings} from "../app/api/types/types.ts";
import {useRouter} from "vue-router";
import {LANGUAGES, OPTIONS} from "../app/config/constants.ts";
import {useI18n} from "vue-i18n";

export default defineStore('app', () => {
  const appConfig: ReactiveVariable<IAppConfig> = reactive({
    isAuth: true,
    Bearer_Auth: '',
    roles: {}
  });

  let settings = reactive({
    language_id: 0,
    currency_id: 0,
    timezone_id: 0,
    date_format_id: 0,
  });

  const settingsOptions: Ref<IAppSettings | null> = ref(null);

  const { locale } = useI18n();

  const router = useRouter()

  const userStore = useUserStore();
  const companyStore = useCompanyStore();

  const getOptions = async () => {
    await getSettings();
    await getRoleOptions()
  }

  const getSettings = async () => {
    await authApi.getSettingsOptionsListFetch(appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        settingsOptions.value = mapOptions(response.data.data);
        console.log(settingsOptions.value)
      }
    })
    await authApi.getSettingsListFetch(appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        companyStore.company.id = response.data.company_id;
        settings.language_id = response.data.settings.language_id;
        settings.timezone_id = response.data.settings.timezone_id;
        settings.date_format_id = response.data.settings.date_format_id;
      }
    })
  }

  const updateSettings = async (dto: ICompanySettings) => {
    return authApi.setCompanySettingsFetch(dto, appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        settings = Object.assign(settings, dto);
      }
      return response;
    });
  };

  const getRoleOptions = async () =>
      authApi.getRoleOptionsListFetch(appConfig.Bearer_Auth).then(response => {
        if (response.status === 200) {
          appConfig.roles = convertRoles(response.data)
        }
      });

  const initApp = async () => {
    return checkAuth()
      .then(data => {
        if (appConfig.Bearer_Auth) {
          getOptions()
        }
        return data;
      })
      .catch(error => {
        appConfig.isAuth = false;
        router.push('sign-in')
        return error
      })
  };
  const checkAuth = async () => {
    if (!appConfig.Bearer_Auth) {
      const storage_token = localStorage.getItem('Bearer_Auth');
      if (!storage_token) {
        await router.push('sign-in')
      }
      appConfig.Bearer_Auth = storage_token as string;
    }
    return userStore.checkUser()
    };
  const logOut = () => {
    appConfig.Bearer_Auth = '';
    appConfig.isAuth = false;
    localStorage.clear();
  };

  watch(
      () => settings.language_id,
      () => {
        if(!settingsOptions.value) {
          locale.value = 'en';
          return;
        }
        locale.value = settingsOptions.value[OPTIONS.languages][settings.language_id]
      },
      { immediate: true }
  );

  return {
    appConfig,
    settings,
    initApp,
    checkAuth,
    logOut,
    getOptions,
    updateSettings,
  };
});
