enum OPTIONS {
  'languages' = 'languages',
  'timezones' = 'timezones',
  'data_formats' = 'data_formats',
  'currencies' = 'currencies',
}

enum HISTORY_FILTERS {
  PRICE ='Price',
  CHANGE = 'Change',
  RULE = 'Rule',
  MADE_BY = 'Made by',
  REVENUE = 'Revenue',
  PROFIT = 'Profit',
  SALES = 'Sales',
  MARGIN = 'Margin',
  CATEGORY = 'Category'
}

enum PRODUCT_FILTERS {
  STATUS ='Status',
  POTENTIAL = 'Potential',
  PRICE ='Price',
  DISCOUNT = 'Discount',
  REVENUE = 'Revenue',
  PROFIT = 'Profit',
  SALES = 'Sales',
  MARGIN = 'Margin',
  CATEGORY = 'Category'
}

const PRODUCT_STATUSES = {
  '1': 'MATCH',
  '2': 'REPRICED',
  '3': 'NOT FOUND',
  '4': 'ERROR',
}

const PAGINATION_STEP = 8

// enum DATE_TIME_FORMAT {
//   'ru' = 'en-US',
//   'en' = 'timezones',
// }

const PASSWORD_LENGTH = 8;

export { PASSWORD_LENGTH, OPTIONS, HISTORY_FILTERS, PAGINATION_STEP, PRODUCT_STATUSES, PRODUCT_FILTERS };
