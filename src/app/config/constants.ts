const LANGUAGES: { [key: string]: string } = {
  English: 'en',
  Deutch: 'de',
  Polski: 'pl',
  Español: 'esp'
};

enum OPTIONS {
  'languages' = 'languages',
  'timezones' = 'timezones',
  'data_formats' = 'data_formats',
  'currencies' = 'currencies',
}

const CURRENCY = ['USD', 'EUR', 'GBP'];

const DATE_TIME_FORMAT = ['DD-MM-YYYY', 'YYYY-MM-DD'];

const TIME_ZONE = ['GMT+0', 'GMT+1', 'GMT+2', 'GMT+3'];

const PASSWORD_LENGTH = 8;

export { LANGUAGES, CURRENCY, DATE_TIME_FORMAT, TIME_ZONE, PASSWORD_LENGTH, OPTIONS };
