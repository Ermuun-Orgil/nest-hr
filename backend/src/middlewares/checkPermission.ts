import { NextFunction, Request, Response } from "express";
import { getGroups } from "../queries/groupService";
import { findUserId } from "../queries/userService";
import { UserType } from "../utils/types/user";

export const authUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authUsers running");

  try {
    const user: UserType | null = await findUserId({ params: { id: req.body.id } });
    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }
    if (user.userGroup.length === 0) {
      res.status(401).json({ message: "Unauthorized request" });
      return;
    } else {
      const groups = await getGroups();
      if (user.userGroup.filter(userGroup => groups.find(g => g.name == userGroup)?.menus?.employees[0]).length != 0) {
        next();
        return;
      } else {
        res.status(401).json({ message: "Unauthorized request" });
        return;
      }
    }
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
    console.log(user);
    console.log(user.role);
    if (user.role != "admin" && user.role != "hr") {
      res.status(401).json({ message: "Unauthorized request" });
      return;
    } else {
      next();
      return;
    }
  } catch (err) {
    next(err);
  }
};

function parseJwt(token: string) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}
