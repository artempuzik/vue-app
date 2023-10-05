const LANGUAGES: { [key: string]: string } = {
    'English': 'en',
    'Deutch': 'de',
    'Polski': 'pl',
    'Español': 'esp'
}

const CURRENCY = ['USD', 'EUR', 'GBP']

const DATE_TIME_FORMAT = ['DD-MM-YYYY', 'YYYY-MM-DD']

const TIME_ZONE = ['GMT+0', 'GMT+1', 'GMT+2', 'GMT+3']

const USER_STATUSES = {
    '0': 'Admin',
    '1': 'User',
    '2':'Manager'
}

export {
    LANGUAGES,
    CURRENCY,
    DATE_TIME_FORMAT,
    TIME_ZONE,
    USER_STATUSES,
}