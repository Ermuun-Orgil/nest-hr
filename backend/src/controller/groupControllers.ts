import { getGroups, addGroup, deleteGroup, updateGroup } from '../queries/groupService';
import { Request, Response } from 'express';

export const getGroupsService = async (request: Request, response: Response) => {
  console.log('GetGroupService running: ');
  try {
    response.send(await getGroups());
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const getGroupService = async (request: Request, response: Response) => {
  console.log('getGroupService running');
  try {
    // const result = await getGroupPer(request);
    response.status(200).send('result');
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const updateGroupService = async (request: Request, response: Response) => {
  console.log('UpdateGroupService running');
  try {
    const result = await updateGroup(request);
    response.status(200).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};

export const createGroupService = async (request: Request, response: Response) => {
  console.log('CreateGroupService running');
  try {
    const result = await addGroup(request);
    response.status(201).send(result);
  } catch (error) {
    /* istanbul ignore next */
    response.status(400).send(error);
  }
};

export const deleteGroupService = async (request: Request, response: Response) => {
  console.log('deleteGroupService running');
  try {
    const result = await deleteGroup(request);
    response.status(200).send({
      message: 'Deleted successfully',
    });
  } catch (error) {
    /* istanbul ignore next */
    response.status(500).send(error);
  }
};
