export type HistoryRequestBody = {
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
    "sales_max": number,
    "margin_min": number,
    "margin_max": number,
    "category_id": string[],
    "limit": number,
    "offset": number
}

export type HistoryResponse = {
    history: History[],
    count: number,
}

export type History = {
    "sku": string,
    "product_id": number,
    "product_name": string,
    "product_group": string,
    "old_price": number,
    "made_by": number,
    "new_price": number,
    "repricing_date": Date,
    "rule_id": number
}