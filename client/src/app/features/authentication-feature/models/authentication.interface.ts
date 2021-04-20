export interface LoginIUser {
  email: string;
  password: string;
}

export interface RegisterIUser {
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName?: string;
}
