export interface UserType {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userGroup: string[];
  createdAt: Date;
}
