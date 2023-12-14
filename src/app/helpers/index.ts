import {PASSWORD_LENGTH} from '../config/constants.ts';
import {IAppSettings, IOption, IOptionSetting} from "../types";

export const emailValidator = (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

export const checkPassword = (password: string) => !password.length || password.length >= PASSWORD_LENGTH;

export const convertDate = (date: Date, locale: string) => {
  // const key = DATE_TIME_FORMAT[locale] as string || 'en-GB'
  return  new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
};

export const getDuration = (date: Date) => {
  const now = new Date()
  const difference = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor((difference) / (1000));

  if (seconds < 60) {
    return `${seconds}sec.`
  }
  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}min.`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 60) {
    return `${hours}h.`
  }

  const days = Math.floor(hours / 24)


  if (days < 365) {
    return `${days}d.`
  }
  const years = Math.floor(days / 365)

  return `${years}y.`
}

export const convertRoles = (roles: Array<{role_id: number, role_name: string}>) => {
  const result: {[key: number]: string} = {}
  roles.forEach(r => result[r.role_id] = r.role_name)
  return result;
}

export const getKeyByRoleValue = (object: {[key: string]: string}, value: string) => {
  const result =  Object.keys(object).find((key: string) => object[key] === value);
  return result as string
}

const mapSettingsOptions = (object: IOption[]) => {
  const options: {[key: number]: string} = {}
  object.forEach(o => {
    options[o.option_id] = o.option_name
  })
  return options
}

export const mapOptions = (object: IOptionSetting[]) => {
  const options = {}
  object.forEach(o => {
    //@ts-ignore
    options[o.settings_name] = mapSettingsOptions(o.settings_options)
  })
  return options as IAppSettings
}

export const convertFormatToIndex = (value: string, object: {} | null) => {
  if(!object) {
    return 1
  }
  const values = Object.keys(object)
  //@ts-ignore
  const element = values.find(key => object[key] === value)
  if (!element) {
    return 1
  }
  return +element
}

export const mapPriceHistory = (graph: Array<[number, Date]>) => {
  const data: {labels: string[], data: number[]} = {
    labels: [],
    data: []
  }
  graph.forEach(g => {
    const price = Math.floor(g[0])
    data.data.push(price)
    data.labels.push(
        getDayAndMonth(g[1])
    )
  })
  return data
}

export const mapProductElasticity = (graph: Array<[number, number]>) => {
  const data: {labels: string[], data: number[]} = {
    labels: [],
    data: []
  }
  graph.forEach(g => {
    data.data.push(g[1])
    data.labels.push(`${g[0]}$`)
  })
  return data
}

export const getDayAndMonth = (date: Date) => {
  const day = new Date(date).getDay() + 1
  const month = new Date(date).toDateString().split(' ')[1]
  return `${day} ${month}`
}

export const cutTitle = (title: string | undefined, length = 22, separator = ' ') => {
  if(!title) return ''
  if (title.length <= length) return title;
  return title.substring(0, title.lastIndexOf(separator, length));
}
