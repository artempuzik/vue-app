import fetch from './axios.ts'
import {IChangeUserPassword, IUser} from "./types.ts";

const checkUser = (token: string) => fetch.get('/user/me/', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const changeProfilePassword = (dto: IChangeUserPassword, token: string) => fetch.post('/user/change-password/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const updateUser = (dto: Partial<IUser>, token: string) => fetch.put('/user/update/', dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const updateMember = (dto: Partial<IUser>, id: string, token: string) => fetch.put('/user/update_member/'+id, dto,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


export {
    checkUser,
    changeProfilePassword,
    updateMember,
    updateUser,
}