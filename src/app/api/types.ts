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
    avatar: null | string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_company_admin: boolean;
    is_confirmed: boolean;
}

export interface ICheckUserResponse extends IUser{
    company: string;
    email: string;
    id: string;
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