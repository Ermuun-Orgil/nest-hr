import { NextFunction, Request, Response } from "express";
import { parseJwt } from "../queries/userService";

export default async function kpiPermission(req: Request, res: Response, next: NextFunction) {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    res.status(400).json("Error! Auth is not provided!");
    return;
  }
  try {
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(400).json("No token provided!");
      return;
    }
    const user = parseJwt(token);
    if (!user) {
      res.status(400).json("No user found!");
      return;
    }
    res.locals.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Expired token" });
      return;
    }
    res.status(500).json({ message: "Failed to authenticate user" });
  }
}
