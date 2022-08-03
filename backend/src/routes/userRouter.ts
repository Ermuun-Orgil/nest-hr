import express from "express";
import {
  getUsersService,
  getUserService,
  createUserService,
  deleteUserService,
  updateUserService,
  addUserToGroupService,
  getKpiService,
} from "../controller/userControllers";
import { authenticateToken, authAddtogroup } from "../middlewares";
// import checkMiddle from "../middlewares/checkMiddle";
// import kpiPermission from "../middlewares/kpiPermission";
import authLogin from "../middlewares/authLogin";
// import { getGroups } from "../queries/groupService";

const userRouter = express.Router();

userRouter.post(
  "/users",
  // [authenticateToken, checkMiddle({ module: "user", action: "read" }), authUsers],
  getUsersService
);
userRouter.get("/user/:id", getUserService);
userRouter.patch("/user/:id", updateUserService);
userRouter.post(
  "/user",
  // [checkMiddle({ mode: "user", action: "update", groups: getGroups() }), authUsers],
  createUserService
);
userRouter.delete("/user", deleteUserService);
userRouter.post("/addtogroup", [authenticateToken, authAddtogroup], addUserToGroupService);
userRouter.post("/login", authLogin);

//  get user info APIs
userRouter.get("/kpi", [authenticateToken], getKpiService);

export default userRouter;
