export interface Token {
  expirationDate: Date;
  tokenStr: string;
}

export interface SignInForm {
  login: string;
  password: string,
}

export interface SignInView {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  token: Token;
}

export interface SignupForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string,
  password: string,
}
