import { findUserId, getUsers, addUser, deleteUser, updateUser, addUserToGroup } from '../queries/userService';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

export const getUsersService = async (request: Request, response: Response) => {
  console.log('getUsersService running');
  try {
    response.send(await getUsers());
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const getUserService = async (request: Request, response: Response) => {
  try {
    const result = await findUserId(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const updateUserService = async (request: Request, response: Response) => {
  try {
    const result = await updateUser(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};
export const addUserToGroupService = async (request: Request, response: Response) => {
  try {
    const result = await addUserToGroup(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const createUserService = async (request: Request, response: Response) => {
  try {
    const result = await addUser(request);
    response.status(201).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(400).send(error);
  }
};

export const deleteUserService = async (request: Request, response: Response) => {
  try {
    const result = await deleteUser(request);
    response.status(200).send({
      message: 'Deleted successfully',
    });
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const getToken = async (request: Request, response: Response) => {
  let existingUser = {
    id: 123,
    email: '123@gmail.com',
  };
  try {
    let Secret = process.env.JWT_SECRET || 'Test';
    let token = sign({ userId: existingUser.id, email: existingUser.email }, Secret, {
      expiresIn: '1h',
    });
    return response.status(500).send({ token: token });
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};
