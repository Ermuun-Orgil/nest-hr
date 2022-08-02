import express from 'express';
import {
  getUsersService,
  getUserService,
  createUserService,
  deleteUserService,
  updateUserService,
  addUserToGroupService,
  getToken,
} from '../controller/userControllers';
import { authenticateToken, authUsers, authAddtogroup, checkMiddle, authLogin } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/users', [authenticateToken, checkMiddle, authUsers], getUsersService);
userRouter.get('/user/:id', getUserService);
userRouter.patch('/user/:id', updateUserService);
userRouter.post('/user', createUserService);
userRouter.delete('/user', deleteUserService);
userRouter.post('/addtogroup', [authenticateToken, authAddtogroup], addUserToGroupService);
userRouter.post('/login', authLogin);

export default userRouter;
