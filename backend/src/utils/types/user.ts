import { PermissionType } from './permissions';

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
