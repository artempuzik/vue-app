export type ProductRequestBody = {
    "status_id": string[],
    "potential_min": number,
    "potential_max": number,
    "discount_min": number,
    "discount_max": number,
    "price_min": number,
    "price_max": number,
    "revenue_min": number,
    "revenue_max": number,
    "profit_min": number,
    "profit_max": number,
    "sales_min": number,
    "sales_max": number,
    "margin_min": number,
    "margin_max": number,
    "category_id": string[],
    "limit": number,
    "offset": number
}

export type ProductExportRequestBody = {
    "price_min": number,
    "price_max": number,
    "price_change_min": number,
    "price_change_max": number,
    "rule_id": string[],
    "user_id": string[],
    "revenue_min": number,
    "revenue_max": number,
    "profit_min": number,
    "profit_max": number,
    "sales_min": number,
    "sales_max": number
    "margin_min": number,
    "margin_max": number,
    "category_id": string[],
    "limit": number,
    "offset": number
}

export type ProductFilters = {
    "status_id": [],
    "discount_min": number,
    "discount_max": number,
    "price_min": number,
    "price_max": number,
    "revenue_min": number,
    "revenue_max": number,
    "profit_min": number,
    "profit_max": number,
    "sales_min": number,
    "sales_max": number,
    "margin_min": number,
    "margin_max": number,
    "category_id": [],
    "limit": number,
    "offset": number
}