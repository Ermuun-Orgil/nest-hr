// import { PermissionType } from "./permissions";
// export enum Action {
//   read = "read",
//   create = "create",
//   update = "update",
//   delete = "delete",
// }

export interface UserType {
  _id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  userGroup: string[];
  createdAt: Date;
  __v: number;
}
// export interface IPermission {
//   _id?: string;
//   module: string;
//   action: Action;
// }
