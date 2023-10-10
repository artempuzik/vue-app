import fetch from './axios.ts';
import {IApiQuery, ICreateProduct, IPostProduct, IProductSerializer, IStatisticSerializer} from './types/types.ts';

const getProductsFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
  fetch.get(`/products/?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const createProductFetch = (token: string, dto: IProductSerializer) =>
    fetch.post('/products/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateProductByIdFetch = (token: string, dto: IProductSerializer) =>
    fetch.put('/products/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeProductByIdFetch = (token: string, id: string) =>
    fetch.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

// ------ category ------ //

const getProductCategoryFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
    fetch.get(`/products/category/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const createProductCategoryFetch = (token: string, dto: ICreateProduct) =>
    fetch.post('/products/category/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductCategoryByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateProductCategoryByIdFetch = (token: string, dto: ICreateProduct) =>
    fetch.put('/products/category/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeProductCategoryByIdFetch = (token: string, id: string) =>
    fetch.delete(`/products/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

// ------ changes ------ //

const getProductChangesFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
    fetch.get(`/products/changes/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const createProductChangesFetch = (token: string, dto: IPostProduct) =>
    fetch.post('/products/changes/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductChangesByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/changes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateProductChangesByIdFetch = (token: string, dto: IPostProduct) =>
    fetch.put('/products/changes/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeProductChangesByIdFetch = (token: string, id: string) =>
    fetch.delete(`/products/changes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

// ------ history ------ //

const getProductHistoryFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
    fetch.get(`/products/history/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductHistoryByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/history/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

// ------ changes ------ //

const getProductStatisticsFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
    fetch.get(`/products/statistics/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const createProductStatisticsFetch = (token: string, dto: IStatisticSerializer) =>
    fetch.post('/products/statistics/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductStatisticsByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/statistics/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateProductStatisticsByIdFetch = (token: string, dto: IStatisticSerializer) =>
    fetch.put('/products/statistics/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeProductStatisticsByIdFetch = (token: string, id: string) =>
    fetch.delete(`/products/statistics/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

// ------ type_stats ------ //

const getProductTypeStatsFetch = (token: string, { page = 1, limit = 10 }: IApiQuery) =>
    fetch.get(`/products/type_stats/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const createProductTypeStatsFetch = (token: string, dto: IStatisticSerializer) =>
    fetch.post('/products/type_stats/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const getProductTypeStatsByIdFetch = (token: string, id: string) =>
    fetch.get(`/products/type_stats/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const updateProductTypeStatsByIdFetch = (token: string, dto: IStatisticSerializer) =>
    fetch.put('/products/type_stats/', dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const removeProductTypeStatsByIdFetch = (token: string, id: string) =>
    fetch.delete(`/products/statistics/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export {
    getProductsFetch,
    createProductFetch,
    getProductByIdFetch,
    updateProductByIdFetch,
    removeProductByIdFetch,
    getProductCategoryFetch,
    createProductCategoryFetch,
    getProductCategoryByIdFetch,
    updateProductCategoryByIdFetch,
    removeProductCategoryByIdFetch,
    getProductChangesFetch,
    createProductChangesFetch,
    getProductChangesByIdFetch,
    updateProductChangesByIdFetch,
    removeProductChangesByIdFetch,
    getProductHistoryFetch,
    getProductHistoryByIdFetch,
    getProductStatisticsFetch,
    createProductStatisticsFetch,
    getProductStatisticsByIdFetch,
    updateProductStatisticsByIdFetch,
    removeProductStatisticsByIdFetch,
    getProductTypeStatsFetch,
    createProductTypeStatsFetch,
    getProductTypeStatsByIdFetch,
    updateProductTypeStatsByIdFetch,
    removeProductTypeStatsByIdFetch,
};
