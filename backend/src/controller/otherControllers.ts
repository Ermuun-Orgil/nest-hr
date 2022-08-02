import {
  getPermission,
  getPermissions,
  addPermission,
  deletePermission,
  updatePermission,
} from "../queries/permissionService";
import { Request, Response } from "express";

export const getPermissionsService = async (request: Request, response: Response) => {
  console.log("getPermissionService running");
  try {
    response.send(await getPermissions());
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const getPermissionService = async (request: Request, response: Response) => {
  console.log("getPermissionService running");
  try {
    const result = await getPermission(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const updatePermissionService = async (request: Request, response: Response) => {
  console.log("UpdatePermissionService running");
  try {
    const result = await updatePermission(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const createPermissionService = async (request: Request, response: Response) => {
  console.log("CreatePermissionService running");
  try {
    const result = await addPermission(request);
    response.status(201).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(400).send(error);
  }
};

export const deletePermissionService = async (request: Request, response: Response) => {
  console.log("deletePermissionService running");
  try {
    const result = await deletePermission(request);
    response.status(200).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};
