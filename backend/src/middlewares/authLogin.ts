import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { db } from "../models";
import { UserType } from "../utils/types/user";

const User = db.user;
export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let existingUser: UserType | null;
  console.log("authLogin is runngin");
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
  let token: string;
  try {
    //Creating jwt token
    token = sign({ _id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return res.status(400).json({
      success: false,
      error: error,
    });
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser._id,
      email: existingUser.email,
      token: token,
    },
  });
};

/** TOKEN DECODER
  function parseJwt(token: string) {
      var base64Payload = token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      return JSON.parse(payload.toString());
    }
    console.log('decoded jwt', parseJwt(token));
 */
