enum OPTIONS {
  'languages' = 'languages',
  'timezones' = 'timezones',
  'data_formats' = 'data_formats',
  'currencies' = 'currencies',
}

enum HISTORY_FILTERS {
  PRICE ='Price',
  CHANGE = 'Change (%)',
  RULE = 'Rule',
  MADE_BY = 'Made by',
  REVENUE = 'Revenue',
  PROFIT = 'Profit',
  SALES = 'Sales',
  MARGIN = 'Margin',
  CATEGORY = 'Category'
}

const PAGINATION_STEP = 8

// enum DATE_TIME_FORMAT {
//   'ru' = 'en-US',
//   'en' = 'timezones',
// }

const PASSWORD_LENGTH = 8;

export { PASSWORD_LENGTH, OPTIONS, HISTORY_FILTERS, PAGINATION_STEP };
