import { Request } from "express";
import db from "../models";

const Group = db.group;
export const getGroups = async () => {
  const groups = await Group.find({});
  return groups;
};

export const updateGroup = (request: Request) => {
  return Group.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
};

export const addGroup = (request: Request) => {
  return new Group(request.body).save();
};

export const deleteGroup = (request: Request) => {
  return Group.findByIdAndDelete(request.body._id);
};
