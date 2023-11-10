import fetch from './axios-dashboard'
import {HistoryRequestBody} from "../types";

const getHistory = (dto: HistoryRequestBody, token: string) => fetch.post('/history', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const exportHistory = (dto: HistoryRequestBody, token: string) => fetch.post('/history/export', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getHistoryFilters = (token: string) => fetch.get(`/history/filters`, {
    headers: {
        auth: `Bearer ${token}`
    }
})


export {
    getHistory,
    exportHistory,
    getHistoryFilters,
}