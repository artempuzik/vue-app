export const emailValidator = (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

export const convertTime = (time: Date, format: string) => {
    switch (format) {
        case 'GTM+0': return time
        case 'GTM+1': return time
        case 'GTM+2': return time
        case 'GTM+3': return time
        default: return time
    }
}

export const convertDate = (time: Date, format: string) => {
    switch (format) {
        case 'YYYY-MM-DD': return new Date(time)
        default: return new Date(time)
    }
}