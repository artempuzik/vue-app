import fetch from './axios.ts';
import { ICreateCompany } from './types/types.ts';

const createNewCompanyFetch = (dto: ICreateCompany, token: string) =>
  fetch.post('/company/', dto, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getCompanyByIdFetch = (token: string, id: string) =>
  fetch.get(`/company/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const updateCompanyByIdFetch = (token: string, dto: ICreateCompany, id: string) =>
  fetch.put(`/company/${id}/`, dto, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const deleteCompanyByIdFetch = (token: string, id: string) =>
  fetch.delete(`/company/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export {
  createNewCompanyFetch,
  getCompanyByIdFetch,
  updateCompanyByIdFetch,
  deleteCompanyByIdFetch
};
