// export interface IRegisterFormData {
//   username: string;
//   email: string;
//   password: string;
// }

// export type Link = {
//   id?: string;
//   name: string;
//   url: string;
//   userId: string;
// };

export type LinkValues = {
  name: string;
  url: string;
  id: string;
  categoryId: string;
  userId: string;
  linkCategory: any;
};

export type CategoryValues = {
  id: string;
  name: string;
  slug: string;
};
