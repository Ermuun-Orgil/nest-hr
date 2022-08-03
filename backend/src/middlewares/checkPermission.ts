import { NextFunction, Request, Response } from "express";
import { findUserId, parseJwt } from "../queries/userService";
import { UserType } from "../utils/types/user";

export const authUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authUsers running");
  const token = req.headers.authorization;
  const { mode, act, groups } = res.locals;

  if (!token) {
    res.status(401).json({ message: "No Token found!" });
    return;
  }
  try {
    const userGroups: string[] = parseJwt(token).userGroup;
    if (userGroups.length === 0) {
      res.status(401).json({ message: "Unauthorized request 1" });
      return;
    }
    groups
      .then((allGroups: [any]) => {
        const currentGroups = allGroups.filter(group => userGroups.find(a => group._id.toString() === a));
        for (let i = 0; i < currentGroups.length; i += 1) {
          for (let j = 0; currentGroups[i].permissions.length > j; j += 1) {
            if (currentGroups[i].permissions[j][mode][act]) {
              console.log("true: ", currentGroups[i].permissions[j][mode][act]);
              next();
              return;
            }
          }
        }
        res.status(401).json({ message: "Unauthorized request 2" });
      })
      .catch(() => res.status(401).json({ message: "Unauthorized request 2" }));

    // return;
  } catch (err) {
    next(err);
  }
};

export const authAddtogroup = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authAddtogroup is running");
  const { token } = req.body;
  if (!token) {
    res.status(400).send("No token provided!");
    return;
  }
  const userId = parseJwt(token)._id;
  try {
    const user: UserType | null = await findUserId({ params: { id: userId } });
    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }
    if (user.role !== "admin" && user.role !== "hr") {
      res.status(401).json({ message: "Unauthorized request" });
      return;
    }
    next();
    return;
  } catch (err) {
    next(err);
  }
};
