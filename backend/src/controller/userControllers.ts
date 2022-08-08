import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { findUserId, getUsers, addUser, deleteUser, updateUser, addUserToGroup } from "../queries/userService";

export const getUsersService = async (request: Request, response: Response) => {
  console.log("getUsersService running");
  try {
    return response.send(await getUsers());
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};

export const getUserService = async (request: Request, response: Response) => {
  try {
    const result = await findUserId(request);
    return response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};

export const updateUserService = async (request: Request, response: Response) => {
  try {
    const result = await updateUser(request);
    return response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};
export const addUserToGroupService = async (request: Request, response: Response) => {
  try {
    const result = await addUserToGroup(request);
    return response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};

export const createUserService = async (request: Request, response: Response) => {
  try {
    const result = await addUser(request);
    return response.status(201).send(result);
  } catch (error) {
    /* istanbul ignore next */
    return response.status(400).send(error);
  }
};

export const deleteUserService = async (request: Request, response: Response) => {
  try {
    await deleteUser(request);
    return response.status(200).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};

//  this function is for test!!!
export const getToken = async (request: Request, response: Response) => {
  const existingUser = {
    id: 123,
    email: "123@gmail.com",
  };
  try {
    return response.status(500).send({
      token: sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET || "Test", {
        expiresIn: "1h",
      }),
    });
  } catch (error) {
    /* istanbul ignore next */
    return response.status(500).send(error);
  }
};
