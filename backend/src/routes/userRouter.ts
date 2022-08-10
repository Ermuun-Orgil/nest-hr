import express from "express";
import {
  createUserService,
  getUsersService,
  loginService,
  // getUserService,
  // deleteUserService,
  updateUserService,
} from "../controller/userControllers";
import { checkPermission, tokenCheck } from "../middlewares/middlewares";
import { authRegister } from "../controller/authController";

const userRouter = express.Router();

userRouter.post("/login", loginService);
userRouter.post("/register", [authRegister], createUserService);
userRouter.get("/users", [tokenCheck, checkPermission({ module: "users", action: "read" })], getUsersService);
userRouter.patch("/users", [tokenCheck, checkPermission({ module: "users", action: "update" })], updateUserService);
// userRouter.post("/user", [tokenCheck, checkPermission({ module: "user", action: "create" })], createUserService);

// userRouter.get("/user/:id", getUserService);
// userRouter.patch("/user/:id", updateUserService);
// userRouter.delete("/user", deleteUserService);
// userRouter.post("/addtogroup", [authenticateToken], addUserToGroupService);

// In order to get Token use this API
export default userRouter;
