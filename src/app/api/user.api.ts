import fetch from './axios.ts'
import {IChangeUserPassword, IUser} from "./types/types.ts";

const checkUserFetch = (token: string) => fetch.get('/user/me/', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const changeProfilePasswordFetch = (dto: IChangeUserPassword, token: string) => fetch.post('/user/change-password/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const updateUserFetch = (dto: Partial<IUser>, token: string) => fetch.put('/user/update/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const updateMemberFetch = (dto: Partial<IUser>, id: string, token: string) => fetch.put('/user/update_member/'+id, dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


export {
    checkUserFetch,
    changeProfilePasswordFetch,
    updateMemberFetch,
    updateUserFetch,
}