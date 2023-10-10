import fetch from './axios.ts';
import { IApiQuery, IPostMarketplace } from './types/types.ts';

const getMarketplaceFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
  fetch.get(`/marketplace/?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const createMarketplaceFetch = (token: string, dto: IPostMarketplace) =>
    fetch.post('/marketplace/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getMarketplaceByIdFetch = (token: string, id: string) =>
    fetch.get(`/marketplace/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateMarketplaceByIdFetch = (token: string, dto: IPostMarketplace) =>
    fetch.put('/marketplace/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeMarketplaceByIdFetch = (token: string, id: string) =>
    fetch.delete(`/marketplace/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export {
    getMarketplaceFetch,
    createMarketplaceFetch,
    getMarketplaceByIdFetch,
    updateMarketplaceByIdFetch,
    removeMarketplaceByIdFetch,
};
