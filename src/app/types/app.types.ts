import {OPTIONS} from '../config/constants'

export interface IChangePassword {
  new_password: string;
}

export interface IFirstCheckUserByEmail {
  login: string;
}

export interface IApiQuery {
  offset: number;
  limit: number;
}

export interface ISendInvite {
  email: string;
}

export interface ICompanySettings {
  language_id: number;
  timezone_id: number;
  date_format_id: number;
  currency_id: number;
}

export interface IAppConfig {
  isAuth: boolean,
  Bearer_Auth: string,
  roles: {[key: number]: string}
}

export type IAppSettings = {
  [key in OPTIONS]: {[key: number]: string};
};

export interface IOption {
  option_id: number,
  option_name: string,
}

export interface ISettingsOptions {
  [key: string]: IOption
}

export interface IOptionSetting {
  settings_name: OPTIONS,
  settings_options: Array<IOption>,
}