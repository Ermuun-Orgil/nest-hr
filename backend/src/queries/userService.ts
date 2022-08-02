import { db } from '../models';
import { Request } from 'express';
import { UserType } from '../utils/types/user';

const User = db.user;
//get all users
export const getUsers = () => {
  return User.find({});
};

//get one user by ID
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
export const deleteUser = (request: Request) => {
  return User.findByIdAndDelete(request.body._id);
};
