export interface IRegisterFormData {
  username: string;
  email: string;
  password: string;
}

export type Link = {
  id?: string;
  name: string;
  url: string;
};

export type FormValues = {
  name: string;
  url: string;
  id?: string;
};
