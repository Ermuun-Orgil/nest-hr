import express from 'express';
import {
  getGroupsService,
  getGroupService,
  createGroupService,
  deleteGroupService,
  updateGroupService,
} from '../controller/groupControllers';

const groupRouter = express.Router();

groupRouter.get('/groups', getGroupsService);
groupRouter.get('/group/:id', getGroupService);
groupRouter.patch('/group/:id', updateGroupService);
groupRouter.post('/group', createGroupService);
groupRouter.delete('/group', deleteGroupService);

export default groupRouter;
