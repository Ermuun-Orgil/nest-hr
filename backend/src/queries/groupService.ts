import { db } from '../models';
import { Request } from 'express';
import { PermissionType } from '../utils/types/permissions';
const Group = db.group;
export const getGroups = () => {
  return Group.find({});
};

export const isPermitted = (name: string, callback: any) => {
  Group.findOne({ name: name }, (error: any, data: any) => {
    if (error) {
      return callback(error);
    } else {
      return callback(data);
    }
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
