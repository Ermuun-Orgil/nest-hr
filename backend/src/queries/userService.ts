import { Request } from "express";
import { authLogin } from "../controller/authController";
import db from "../models";
import { UserType } from "../utils/types/user";

// interface ParseJwtType {
//   _id: string;
//   email: string;
//   userGroup: string[];
// }

const User = db.user;

//  get all users
export const getUsers = () => {
  return User.find({});
};

//  get one user by ID
export const findUserId = (request: Request | { params: { id: string } }): UserType | null => {
  return User.findOne({ _id: request.params.id }) as unknown as UserType | null;
};
export const findUserByName = (request: Request) => {
  return User.findOne({ name: request.params.name });
};
export const findUserByEmail = (request: Request) => {
  return User.findOne({ email: request.params.email });
};

export const updateUser = (request: Request) => {
  if (request.body.action) {
    const action = `$${request.body.action}`;
    return User.findByIdAndUpdate(
      request.body.userId,
      { [action]: { userGroup: request.body.groupId } },
      {
        new: true,
      }
    );
  }
  return User.findByIdAndUpdate(request.body.userId, request.body.update, {
    new: true,
  });
};

export const addUser = (request: Request) => {
  return new User(request.body).save();
};

export const deleteUser = (req: Request) => {
  return User.findByIdAndDelete(req.body._id);
};
// this function will be used later
// export function parseJwt(token: string): ParseJwtType {
//   const base64Payload = token.split(".")[1];
//   const payload = Buffer.from(base64Payload, "base64");
//   return JSON.parse(payload.toString());
// }
export const loginUser = authLogin;
