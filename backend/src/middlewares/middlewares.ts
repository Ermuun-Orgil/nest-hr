import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import db from "../models";
// import { findUserId, parseJwt } from "../queries/userService";

const User = db.user;

// Checking token validation
export const tokenCheck = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers?.authorization;

  try {
    if (!token) {
      res.status(401).json({ message: "No token provided or Inviled Token" });
      return;
    }
    verify(token.split(" ")[1], process.env.JWT_SECRET || "secret", (err: any, decoded: any) => {
      if (err) res.status(401).json({ message: "Inviled Token", error: err });
      res.locals.userId = decoded._id;
      req.body.user = decoded;
      next();
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Expired token" });
      return;
    }

    res.status(500).json({ message: "Failed to authenticate user" });
  }
};

// Checking permission for certain action
export const checkPermission =
  ({ module, action }: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let permitted = false;
    if (!res.locals.userId && !req.body?._id)
      res.status(403).send({
        message: "User not found",
      });

    const userWithGroups: any = await User.findById(res.locals.userId || req.body?._id)
      .populate("userGroup")
      .where("user")
      .select("userGroup");
    try {
      userWithGroups.userGroup.forEach((group: any) => {
        if (group.permissions && group.permissions[module]) {
          if (group.permissions[module][action]) {
            permitted = true;
          }
        }
      });
    } catch (e) {
      res.status(400).send(`error: ${e}`);
      return;
    }
    if (!permitted)
      res.status(403).send({
        message: "Permission denied",
      });

    next();
  };

// export const authAddtogroup = async (req: Request, res: Response, next: NextFunction) => {
//   console.log("authAddtogroup is running");
//   const { token } = req.body;
//   if (!token) {
//     res.status(400).send("No token provided!");
//     return;
//   }
//   const userId = parseJwt(token)._id;
//   try {
//     const user: UserType | null = await findUserId({ params: { id: userId } });
//     if (!user) {
//       res.status(401).json({ message: "User not found!" });
//       return;
//     }
//     if (user.role !== "admin" && user.role !== "hr") {
//       res.status(401).json({ message: "Unauthorized request" });
//       return;
//     }
//     next();
//     return;
//   } catch (err) {
//     next(err);
//   }
// };