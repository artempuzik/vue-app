import fetch from './axios.ts'
import {IApiQuery, ICompanySettings, ICreateCompany, ISendInvite} from "./types.ts";

const getCompanyListFetch = (token: string, {page = 0, limit = 0}: IApiQuery) => fetch.get(`/company/?page=${page}&limit=${limit}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const createNewCompanyFetch = (dto: ICreateCompany, token: string) => fetch.post('/company/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const deleteMemberFromCompanyFetch = (id: string, token: string) => fetch.delete(`/company/member/delete/${id}/`,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const sendInviteToMemberFetch = (dto: ISendInvite, token: string) => fetch.post('/company/member/invite/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const setCompanySettingsFetch = (dto: ICompanySettings, id: string, token: string) => fetch.post(`/company/settings/${id}/`, dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const getMemberListByCompanyIdFetch = (token: string, id:string, {page = 0, limit = 0}: IApiQuery) => fetch.get(`/company/${id}/members/?page=${page}&limit=${limit}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const getSettingsListByCompanyIdFetch = (token: string, id:string,) => fetch.get(`/company/${id}/settings/`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const getCompanyByIdFetch = (token: string, id:string,) => fetch.get(`/company/${id}/`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const updateCompanyByIdFetch = (token: string, dto: ICreateCompany, id:string,) => fetch.put(`/company/${id}/`, dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const deleteCompanyByIdFetch = (token: string, id:string,) => fetch.delete(`/company/${id}/`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


export {
    getCompanyListFetch,
    createNewCompanyFetch,
    deleteMemberFromCompanyFetch,
    sendInviteToMemberFetch,
    setCompanySettingsFetch,
    getMemberListByCompanyIdFetch,
    getSettingsListByCompanyIdFetch,
    getCompanyByIdFetch,
    updateCompanyByIdFetch,
    deleteCompanyByIdFetch,
}