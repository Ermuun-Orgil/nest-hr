import express from "express";
import {
  getUsersService,
  // getUserService,
  // createUserService,
  // deleteUserService,
  // updateUserService,
  // addUserToGroupService,
} from "../controller/userControllers";
import { checkPermission, tokenCheck } from "../middlewares";
// import checkMiddle from "../middlewares/checkMiddle";
// import kpiPermission from "../middlewares/kpiPermission";
import authLogin from "../middlewares/authLogin";
// import { getGroups } from "../queries/groupService";

const userRouter = express.Router();

userRouter.get("/users", [tokenCheck, checkPermission({ module: "users", action: "read" })], getUsersService);
// userRouter.get("/user/:id", getUserService);
// userRouter.patch("/user/:id", updateUserService);
// userRouter.post(
//   "/user",
//   // [checkMiddle({ mode: "user", action: "update", groups: getGroups() }), authUsers],
//   createUserService
// );
// userRouter.delete("/user", deleteUserService);
// userRouter.post("/addtogroup", [authenticateToken], addUserToGroupService);

// In order to get Token use this API
userRouter.post("/login", authLogin);

export default userRouter;
