import Permission from "../models/Permission";
import { Request } from "express";

export const getPermissions = () => {
  return Permission.find({});
};

export const getPermission = (request: Request) => {
  return Permission.findOne({ _id: request.params.id });
};

export const updatePermission = (request: Request) => {
  return Permission.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
};

export const addPermission = (request: Request) => {
  return new Permission(request.body).save();
};

export const deletePermission = (request: Request) => {
  return Permission.findByIdAndDelete(request.body._id);
};
