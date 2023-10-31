import { defineStore } from 'pinia';
import { authApi } from '../app/api';
import { reactive, Ref, ref, watch } from 'vue';
import { useAppStore } from './index.ts';
import { ICompanySettings, IUser } from '../app/api/types/types.ts';
import { LANGUAGES } from '../app/config/constants.ts';
import { useI18n } from 'vue-i18n';

export default defineStore('company', () => {
  const { locale } = useI18n();
  const company = reactive({
    id: '',
    company: '',
    name: '',
    company_email: ''
  });

  const companyList = reactive({
    count: 0,
    list: []
  });

  let settings = reactive({
    lang: 'English',
    language_id: 0,
    currency_id: 0,
    timezone_id: 0,
    date_format_id: 0,
  });

  const companyMembers: Ref<IUser[]> = ref([]);

  const appStore = useAppStore();

  const getSettings = async (token: string) => {
    return authApi.getSettingsListFetch(token).then(data => {
      if (data.status === 200) {
        company.id = data.data.company_id;
        settings.language_id = data.data.settings.language_id;
        settings.lang = Object.keys(LANGUAGES)[settings.language_id];
        settings.timezone_id = data.data.settings.timezone_id;
        settings.date_format_id = data.data.settings.date_format_id;
      }
    });
  };

  const getCompanyList = async () => {
    return authApi.getCompanyFetch(appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        companyList.list = data.data.result;
        companyList.count = data.data.count;
      }
    });
  };

  const getMemberList = async () => {
    return authApi.getMemberListFetch(appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        companyMembers.value = data.data.users;
      }
    });
  };

  const removeMemberById = async (id: string) => {
    return authApi.deleteMemberFromCompanyFetch(id, appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        companyMembers.value = companyMembers.value.filter(member => member.user_id !== id);
      }
    });
  };

  const updateSettings = async (dto: ICompanySettings) => {
    return authApi.setCompanySettingsFetch(dto, appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        settings = Object.assign(settings, dto);
      }
    });
  };

  const inviteMember = async (email: string) => {
    return authApi.sendInviteToMemberFetch({ email }, appStore.appConfig.Bearer_Auth).then(data => {
      if (data.status === 200) {
        console.log(data);
      }
    });
  };

  watch(
    () => settings.language_id,
    () => {
      settings.lang = Object.keys(LANGUAGES)[settings.language_id]
      locale.value = LANGUAGES[settings.lang]
    },
    { immediate: true }
  );

  return {
    company,
    settings,
    companyMembers,
    getSettings,
    getCompanyList,
    getMemberList,
    inviteMember,
    removeMemberById,
    updateSettings
  };
});
