import fetch from './axios-dashboard'
import {ProductFilters, ProductExportRequestBody, StarDTO, RepricingSettings, RepricingReprice} from "../types";

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

const selectFavoriteProduct = (token: string, dto: StarDTO) => fetch.post(`/star`, dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductRepricingPeriod = (token: string) => fetch.get(`/product/repricing/time_periods`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const getProductRepricingFrequency = (token: string) => fetch.get(`/product/repricing/frequency`, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const setProductRepricingSettings = (token: string, dto: RepricingSettings) => fetch.post(`/product/repricing/settings`, dto,{
    headers: {
        auth: `Bearer ${token}`
    }
})

const setProductRepricingReprice = (token: string, dto: RepricingReprice) => fetch.post(`/product/repricing/reprice`, dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const setProductRepricingAutoReprice = (token: string, dto: RepricingReprice) => fetch.post(`/product/repricing/auto_reprice`, dto, {
    headers: {
        auth: `Bearer ${token}`
    }
})

const setProductRepricingAutoRepriceOff = (token: string, dto: RepricingReprice) => fetch.post(`/product/repricing/auto_reprice/off`, dto, {
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
    getProductCategories,
    selectFavoriteProduct,
    getProductRepricingPeriod,
    getProductRepricingFrequency,
    setProductRepricingSettings,
    setProductRepricingReprice,
    setProductRepricingAutoReprice,
    setProductRepricingAutoRepriceOff,
}