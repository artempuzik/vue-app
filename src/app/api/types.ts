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
    updated_at?: Date;
    created_at?: Date;
}

export interface ICheckUserResponse extends IUser{
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