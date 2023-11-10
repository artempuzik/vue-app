import fetch from './axios-dashboard'
import {ProductRequestBody, ProductExportRequestBody} from "../types";

const getProducts = (dto: ProductRequestBody, token: string) => fetch.post('/products', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const exportProducts = (dto: ProductExportRequestBody, token: string) => fetch.post('/products/export', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductsById = (id: number, token: string) => fetch.get(`/product/${id}`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductFilters = (token: string) => fetch.get(`/products/filters`, {
    headers: {
        auth: `Bearer ${token}`
    }
})


export {
    getProducts,
    exportProducts,
    getProductFilters,
    getProductsById
}