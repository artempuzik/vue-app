import fetch from './axios-dashboard'

const getDashboard = (token: string) => fetch.get('/dashboard', {
    headers: {
        auth: `Bearer ${token}`
    }
})


export {
    getDashboard,
}