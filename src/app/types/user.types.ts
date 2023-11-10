export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserResponse {
  user_id: number;
  Bearer_Auth: string;
  company_id: string;
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
  member_id: number;
}

export interface ICreateUser {
  password: string;
  surname: string;
  name: string;
  Bearer_Auth?: string;
}
