import { Request } from "express";
import { db } from "../models";
import { PermissionType } from "../utils/types/permissions";

const Group = db.group;
export const getGroups = async () => {
  const groups = await Group.find({});
  return groups;
};

export const isPermitted = (name: string, callback: any) => {
  Group.findOne({ name }, (error: any, data: any) => {
    return error ? callback(error) : callback(data);
  });
};

export const updateGroup = (request: Request) => {
  return Group.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
};

export const addGroup = (request: Request) => {
  return new Group(request.body as PermissionType).save();
};

export const deleteGroup = (request: Request) => {
  return Group.findByIdAndDelete(request.body._id);
};
