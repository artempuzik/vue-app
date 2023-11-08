import fetch from './axios.ts';
import {
    IChangePassword,
    IChangeUserPassword,
    ICompanySettings,
    ICreateUser,
    IFirstCheckUserByEmail,
    ILoginUser,
    ISendInvite,
    IUpdateMember,
    IUser
} from './types/types.ts';

const loginUserFetch = (dto: ILoginUser) => fetch.post('/auth/login/', dto);

const checkExistUserByEmailFetch = (dto: IFirstCheckUserByEmail) => fetch.post('/auth/sign_up/check/', dto);

const createUserFetch = (dto: ICreateUser) => fetch.post('/auth/sign_up/data', dto);

const resetPasswordByEmailFetch = (email: string) =>
  fetch.post('/auth/reset_password/email', {
    email
  });

const sendVerifyCodeToResetPasswordFetch = (email: string, code: string) => fetch.post('/auth/reset_password/code', {email, code});

const changePasswordFetch = (dto: IChangePassword, token: string) => fetch.post('/auth/reset_password/new_password', dto,{
    headers: {
        auth: `Bearer ${token}`
    }
});

const checkUserFetch = (token: string) =>
    fetch.get('/auth/profile/', {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const changeProfilePasswordFetch = (dto: IChangeUserPassword, token: string) =>
    fetch.post('/auth/profile/password/', dto, {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const updateUserFetch = (dto: Partial<IUser>, token: string) =>
    fetch.post('/auth/profile/', dto, {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const updateMemberFetch = (dto: IUpdateMember, id: string, token: string) =>
    fetch.post(`/auth/member/${id}/edit`, dto, {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const deleteMemberFromCompanyFetch = (id: string, token: string) => fetch.post(`/auth/member/${id}/delete`, null, {
        headers: {
            auth: `Bearer ${token}`
        }
    });

const sendInviteToMemberFetch = (dto: ISendInvite, token: string) =>
    fetch.post('/auth/invite_member/', dto, {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const getMemberListFetch = (token: string) =>
    fetch.get('/auth/members', {
      headers: {
          auth: `Bearer ${token}`
      }
    });

const setCompanySettingsFetch = (dto: ICompanySettings, token: string) =>
    fetch.post('/auth/settings/', dto, {
        headers: {
            auth: `Bearer ${token}`
        }
    });

const getSettingsListFetch = (token: string) =>
    fetch.get('/auth/settings/', {
        headers: {
            auth: `Bearer ${token}`
        }
    });

const getSettingsOptionsListFetch = (token: string) =>
    fetch.get('/auth/settings/options', {
        headers: {
            auth: `Bearer ${token}`
        }
    });

const getRoleOptionsListFetch = (token: string) =>
    fetch.get('/auth/roles/options', {
        headers: {
            auth: `Bearer ${token}`
        }
    });

const getCompanyFetch = (token: string) =>
    fetch.get('auth/company', {
        headers: {
            auth: `Bearer ${token}`
        }
    });

export {
  loginUserFetch,
  checkExistUserByEmailFetch,
  createUserFetch,
  resetPasswordByEmailFetch,
  sendVerifyCodeToResetPasswordFetch,
  changePasswordFetch,
  updateMemberFetch,
  updateUserFetch,
  changeProfilePasswordFetch,
  checkUserFetch,
  sendInviteToMemberFetch,
  getMemberListFetch,
  deleteMemberFromCompanyFetch,
  getSettingsListFetch,
  setCompanySettingsFetch,
  getSettingsOptionsListFetch,
  getRoleOptionsListFetch,
  getCompanyFetch,
};
