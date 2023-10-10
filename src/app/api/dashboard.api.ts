import fetch from './axios.ts';
import { IApiQuery, IPostDashboard } from './types/types.ts';

const getDashboardFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
  fetch.get(`/dashboard/?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const createDashboardFetch = (token: string, dto: IPostDashboard) =>
    fetch.post('/dashboard/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getDashboardByIdFetch = (token: string, id: string) =>
    fetch.get(`/dashboard/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateDashboardByIdFetch = (token: string, dto: IPostDashboard) =>
    fetch.put('/dashboard/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeDashboardByIdFetch = (token: string, id: string) =>
    fetch.delete(`/dashboard/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export {
    getDashboardFetch,
    createDashboardFetch,
    getDashboardByIdFetch,
    updateDashboardByIdFetch,
    removeDashboardByIdFetch,
};
