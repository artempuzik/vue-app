export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserResponse {
  user_id: number;
  Bearer_Auth: string;
  company_id: string;
}

export interface IChangePassword {
  new_password: string;
}

export interface IChangeUserPassword {
  new_password: string;
  password: string;
}

export interface IUser {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  role_id: number;
  logged_at?: Date;
  created_at?: Date;
}

export interface IUpdateMember {
  role_id: number;
}

export interface ICheckUserResponse extends IUser {
  company: string;
  in_consideration: boolean;
  is_staff: boolean;
}

export interface IFirstCheckUserByEmail {
  login: string;
}

export interface ICreateUser {
  password: string;
  surname: string;
  name: string;
  Bearer_Auth?: string;
}

export interface IApiQuery {
  page: number;
  limit: number;
}

export interface ICreateCompany {
  name: string;
  email: string;
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

export interface IPostDashboard {
  company: string;
  marketplace: string;
  data_json: string;
  id?: string;
  create_at?: string;
}

export interface IPostMarketplace {
  name: string;
  id?: string;
}

export interface ICreateProduct {
  name: string;
}

export interface IProductSerializer {
  id: string;
  sku: string;
  name: string;
  category: string;
  company: string;
  marketplace: string;
  price: number;
  potencial: number;
  margin: number;
  sales: number;
  discount: number;
  cost: number;
  link: string;
  photos: string[];
  count_up_price: number;
  count_low_price: number;
  create_at: string;
}

export interface IPostProduct {
  id: string;
  product: string;
  date: string;
  created_by: string;
  last_price: number;
  new_price: number;
  change: number;
  rule: number;
}

export interface IProductHistory {
  id: string;
  product: string;
  price: number;
  sales: number;
  revenue: number;
  profit: number;
  cost: number;
  create_at: string;
  made_by: string;
}

export interface IStatisticSerializer {
  id: string;
  type: string;
  price: number;
  potencial: number;
  margin: number;
  name_x: string;
  x: string;
  name_y: string;
  y: string;
}

export interface IAppConfig {
  isAuth: boolean,
  Bearer_Auth: string,
  roles: {[key: number]: string}
}

export interface IOption {
  option_id: number,
  option_name: string,
}

export interface ISettingsOptions {
  settings_name: string,
  settings_options: IOption[]
}