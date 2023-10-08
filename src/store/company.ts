import { defineStore } from 'pinia';
import { companyApi } from '../app/api';
import { reactive, Ref, ref, watch } from 'vue';
import { useAppStore } from './index.ts';
import { ICompanySettings, IUser } from '../app/api/types/types.ts';
import { CURRENCY, DATE_TIME_FORMAT, LANGUAGES, TIME_ZONE } from '../app/config/constants.ts';
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
    currency: CURRENCY[0],
    timezone: TIME_ZONE[0],
    datetime_format: DATE_TIME_FORMAT[0]
  });

  const companyMembers: Ref<IUser[]> = ref([]);

  const appStore = useAppStore();

  const getSettings = (token: string) => {
    return companyApi.getSettingsListByCompanyIdFetch(token, company.company).then(data => {
      if (data.status === 200) {
        company.id = data.data.id;
        company.company = data.data.company;
        settings.lang = data.data.lang ? data.data.lang : settings.lang;
        settings.currency = data.data.currency ? data.data.currency : settings.currency;
        settings.timezone = data.data.timezone ? data.data.timezone : settings.timezone;
        settings.datetime_format = data.data.datetime_format ? data.data.datetime_format : settings.datetime_format;
      }
    });
  };

  const getCompanyList = (token: string) => {
    return companyApi.getCompanyListFetch(token, { page: 1, limit: 10 }).then(data => {
      if (data.status === 200) {
        companyList.list = data.data.result;
        companyList.count = data.data.count;
      }
    });
  };

  const getMemberListByCompanyId = (page = 1, limit = 10) => {
    return companyApi.getMemberListByCompanyIdFetch(appStore.appConfig.accessToken, company.company, { page, limit }).then(data => {
      if (data.status === 200) {
        companyMembers.value = data.data;
      }
    });
  };

  const removeMemberById = (id: string) => {
    return companyApi.deleteMemberFromCompanyFetch(id, appStore.appConfig.accessToken).then(data => {
      if (data.status === 200) {
        companyMembers.value = companyMembers.value.filter(member => member.id !== id);
      }
    });
  };

  const updateSettings = (dto: ICompanySettings) => {
    return companyApi.setCompanySettingsFetch(dto, company.company, appStore.appConfig.accessToken).then(data => {
      if (data.status === 200) {
        settings = Object.assign(settings, dto);
      }
    });
  };

  const inviteMember = (email: string) => {
    return companyApi.sendInviteToMemberFetch({ company: company.company, email }, appStore.appConfig.accessToken).then(data => {
      if (data.status === 200) {
        console.log(data);
      }
    });
  };

  watch(
    () => settings.lang,
    () => (locale.value = LANGUAGES[settings.lang]),
    { immediate: true }
  );

  return {
    company,
    settings,
    companyMembers,
    getSettings,
    getCompanyList,
    getMemberListByCompanyId,
    inviteMember,
    removeMemberById,
    updateSettings
  };
});
