import express from "express";
import {
  getPermissionsService,
  getPermissionService,
  createPermissionService,
  deletePermissionService,
  updatePermissionService,
} from "../controller/otherControllers";
const permissionRouter = express.Router();

permissionRouter.get("/permissions", getPermissionsService);
permissionRouter.get("/permission/:id", getPermissionService);
permissionRouter.patch("/permission/:id", updatePermissionService);
permissionRouter.post("/permission", createPermissionService);
permissionRouter.delete("/permission", deletePermissionService);

export default permissionRouter;
