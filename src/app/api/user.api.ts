import fetch from './axios.ts'

const checkUser = (token: string) => fetch.get('/user/me/', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


export {
    checkUser,
}