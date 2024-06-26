import { defineStore } from 'pinia';
import { authApi } from '../app/api';
import { reactive, Ref, ref } from 'vue';
import { useAppStore } from './index.ts';
import {IUser} from '../app/types';

export default defineStore('company', () => {
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

  const companyMembers: Ref<IUser[]> = ref([]);

  const appStore = useAppStore();

  const getCompanyList = async () => {
    return authApi.getCompanyFetch(appStore.appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        companyList.list = response.data.result;
        companyList.count = response.data.count;
      }
    });
  };

  const getMemberList = async () => {
    return authApi.getMemberListFetch(appStore.appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        companyMembers.value = response.data.users;
      }
    });
  };

  const removeMemberById = async (id: string) => {
    return authApi.deleteMemberFromCompanyFetch(id, appStore.appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        companyMembers.value = companyMembers.value.filter(member => member.user_id.toString() !== id);
      }
    });
  };

  const inviteMember = async (email: string) => authApi.sendInviteToMemberFetch({ email }, appStore.appConfig.Bearer_Auth)

  const init = async () => {
    await getMemberList()
  }
  return {
    company,
    companyMembers,
    init,
    getCompanyList,
    getMemberList,
    inviteMember,
    removeMemberById,
  };
});
