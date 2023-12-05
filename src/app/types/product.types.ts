import {History} from "./history.types.ts";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

export type Product = {
    product_id: number,
    sku: string,
    product_name: string,
    category_name: string,
    status_id: number,
    product_price: number,
    product_potential: number
}

export type ProductCategory = {
    id: number,
    name: string,
}

export type ProductForecast = {
    profit_forecast: number,
    profit_forecast_change: number,
    revenue_forecast: number,
    revenue_forecast_change: number,
    sales_forecast: number,
    sales_forecast_change: number,
}

export type ProductElasticity = {
    actual_price: number,
    forecast: ProductForecast,
    graph: Array<[number, number]>
    recommended_price: number,
    settings: {
        max_price: number,
        max_sale: number,
        min_price: number,
        min_sale: number,
        sku_cost: number,
    }

}

export type ProductItem = {
    category_name: string,
    cost: number,
    elasticity: ProductElasticity
    history: History[]
    margin: number,
    overview: {
        revenue: number,
        profit: number,
        sales: number,
    },
    price: number,
    price_history:  {
        graph: Array<[number, Date]>
    }
    product_id: number,
    product_name: string,
    sku: string,
}

export type ProductExportRequestBody = {
    price_min: number,
    price_max: number,
    price_change_min: number,
    price_change_max: number,
    rule_id: string[],
    user_id: string[],
    revenue_min: number,
    revenue_max: number,
    profit_min: number,
    profit_max: number,
    sales_min: number,
    sales_max: number
    margin_min: number,
    margin_max: number,
    category_id: string[],
    limit: number,
    offset: number
}

export type ProductFilters = {
    status_id: number[],
    discount_min: number,
    discount_max: number,
    potential_min: number,
    potential_max: number,
    price_min: number,
    price_max: number,
    revenue_min: number,
    revenue_max: number,
    profit_min: number,
    profit_max: number,
    sales_min: number,
    sales_max: number,
    margin_min: number,
    margin_max: number,
    category_id: number[],
    limit: number,
    offset: number
}

export type StarDTO = {
    product_id: number,
    status: number,
}