import { Request, Response } from "express";
import { getGroups, addGroup, deleteGroup, updateGroup } from "../queries/groupService";

export const getGroupsService = async (request: Request, response: Response) => {
  try {
    response.send(await getGroups());
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const getGroupService = async (request: Request, response: Response) => {
  try {
    response.status(200).send("result");
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const updateGroupService = async (request: Request, response: Response) => {
  try {
    const result = await updateGroup(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const createGroupService = async (request: Request, response: Response) => {
  try {
    const result = await addGroup(request);
    response.status(201).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(400).send(error);
  }
};

export const deleteGroupService = async (request: Request, response: Response) => {
  try {
    const result = await deleteGroup(request);
    response.status(200).send({
      message: "Deleted successfully",
      data: result,
    });
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};
