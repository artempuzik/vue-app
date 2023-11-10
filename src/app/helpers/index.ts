import {PASSWORD_LENGTH} from '../config/constants.ts';
import {IAppSettings, IOption, IOptionSetting} from "../types";

export const emailValidator = (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

export const checkPassword = (password: string) => !password.length || password.length >= PASSWORD_LENGTH;

export const convertDate = (date: Date, locale: string) => {
  // const key = DATE_TIME_FORMAT[locale] as string || 'en-GB'
  return  new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date)).replace(/\//g, '.')
};

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
