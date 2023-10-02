export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUserResponse {
    user_id: string;
    access_token: string;
    refresh_token: string;
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