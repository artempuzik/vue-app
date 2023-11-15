import fetch from './axios-dashboard'
import {ProductFilters, ProductExportRequestBody} from "../types";

const getProducts = (dto: ProductFilters, token: string) => fetch.post('/products', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const exportProducts = (dto: ProductExportRequestBody, token: string) => fetch.post('/products/export', dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductById = (id: number, token: string) => fetch.get(`/product/${id}`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductFilters = (token: string) => fetch.get(`/products/filters`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductStatus = (token: string) => fetch.get(`/products/status`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductCategories = (token: string) => fetch.get(`/products/categories`, {
    headers: {
        auth: `Bearer ${token}`
    }
})


export {
    getProducts,
    exportProducts,
    getProductFilters,
    getProductById,
    getProductStatus,
    getProductCategories
}