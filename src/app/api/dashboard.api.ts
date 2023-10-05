import fetch from './axios.ts'
import {IApiQuery} from "./types/types.ts";

const getDashboardFetch = (token: string, {page = 1, limit = 10}: IApiQuery) => fetch.get(`/dashboard/?page=${page}&limit=${limit}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


export {
    getDashboardFetch,
}