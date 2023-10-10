export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  id_user: string;
  access: string;
  refresh: string;
  is_admin: boolean;
}

export interface IChangePassword {
  user_id: string;
  new_password: string;
  token: string;
}

export interface IChangeUserPassword {
  new_password: string;
  password: string;
}

export interface IUser {
  id: string;
  avatar: null | string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_company_admin: boolean;
  is_confirmed: boolean;
  email: string;
  role: string;
  updated_at?: Date;
  created_at?: Date;
}

export interface ICheckUserResponse extends IUser {
  company: string;
  in_consideration: boolean;
  is_staff: boolean;
}

export interface IFirstCheckUserByEmail {
  email: string;
}

export interface ICreateUser {
  user_id: string;
  password: string;
  first_name: string;
  last_name: string;
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
  company: string;
  email: string;
}

export interface ICompanySettings {
  company: string;
  lang: string;
  currency: string;
  timezone: string;
  datetime_format: string;
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