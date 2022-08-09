import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import db from "../models";
import { UserType } from "../utils/types/user";

const User = db.user;
export async function authLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  let existingUser: UserType | null;

  try {
    existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      throw new Error("User not Found!");
    }
  } catch (e) {
    return res.status(404).json({
      success: false,
      error: e,
    });
  }

  const token = sign(
    { _id: existingUser._id, email: existingUser.email, userGroup: existingUser.userGroup },
    process.env.JWT_SECRET || "",
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    success: true,
    data: {
      userId: existingUser._id,
      email: existingUser.email,
      token,
    },
  });
}

// ---------------------------------Sign Up --------------------------------------------

export const authRegister = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};
