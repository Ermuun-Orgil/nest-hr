import { Request, Response } from "express";
import { db } from "../models";
import { UserType } from "../utils/types/user";

interface ParseJwtType {
  _id: string;
  email: string;
  userGroup: string[];
}

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
  return User.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
};

export const addUser = (request: Request) => {
  return new User(request.body).save();
};

export const addUserToGroup = (request: Request) => {
  return User.findByIdAndUpdate(
    request.body.user,
    { $push: { userGroup: request.body.group } },
    {
      new: true,
    }
  );
};
export const deleteUser = (req: Request) => {
  return User.findByIdAndDelete(req.body._id);
};
export function parseJwt(token: string): ParseJwtType {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

export const getKpi = (req: Request, res: Response) => {
  console.log(res.locals.user);
};
