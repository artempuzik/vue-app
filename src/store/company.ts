import {defineStore} from 'pinia'
import {companyApi} from "../app/api";
import {reactive, Ref, ref} from "vue";
import {useAppStore} from "./index.ts";
import {IUser} from "../app/api/types.ts";

export default defineStore('company', () => {
    const company = reactive({
        id: '',
        company: '',
        name: '',
        company_email: '',
    })

    const companyList = reactive({
        count: 0,
        list: [],
    })

    const settings = reactive({
        lang: null,
        currency: null,
        timezone: null,
        datetime_format: null,
    })

    const companyMembers = ref<Ref<IUser>>([])

    const appStore = useAppStore()

    const getSettings = (token: string) => {
        return companyApi.getSettingsListByCompanyIdFetch(token, company.company).then(data => {
            if(data.status === 200) {
                company.id = data.data.id
                company.company = data.data.company
                settings.lang = data.data.lang
                settings.currency = data.data.currency
                settings.timezone = data.data.timezone
                settings.datetime_format = data.data.datetime_format
            }
        })
    }

    const getCompanyList = (token: string) => {
        return companyApi.getCompanyListFetch(token, {page: 1, limit: 10}).then(data => {
            if(data.status === 200) {
                companyList.list = data.data.result
                companyList.count = data.data.count
            }
        })
    }

    const getMemberListByCompanyId = (page = 1, limit = 10) => {
        return companyApi.getMemberListByCompanyIdFetch(appStore.appConfig.accessToken, company.company, {page, limit})
            .then(data => {
                if(data.status === 200) {
                    companyMembers.value = data.data
                }
        })
    }

    const removeMemberById = (id: string) => {
        return companyApi.deleteMemberFromCompanyFetch(id, appStore.appConfig.accessToken)
            .then(data => {
                if(data.status === 200) {
                    companyMembers.value = companyMembers.value.filter(member => member.id !== id)
                }
            })
    }

    const inviteMember = (email: string) => {
        return companyApi.sendInviteToMemberFetch({company: company.company, email}, appStore.appConfig.accessToken)
            .then(data => {
                if(data.status === 200) {
                    console.log(data)
                }
            })
    }

    return {
        company,
        settings,
        companyMembers,
        getSettings,
        getCompanyList,
        getMemberListByCompanyId,
        inviteMember,
        removeMemberById,
    }
})