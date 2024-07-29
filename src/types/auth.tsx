export type Auth = {
  isAuth: boolean;
  user: string;
  password: string;
};

export const defaultAuth = {
  isAuth: false,
  password: "",
  user: "",
} as Auth;