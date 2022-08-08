import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { db } from "../models";
import { UserType } from "../utils/types/user";

export default async function authLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  let existingUser: UserType | null;
  console.log("authLogin is runngin: ", email, password);
  try {
    // eslint-disable-next-line no-use-before-define
    existingUser = await db.user.findOne({ email });
  } catch {
    return res.status(400).json({
      success: false,
      error: "Error! Something went wrong.",
    });
  }
  console.log("existingUser: ", existingUser);
  if (!existingUser || existingUser.password !== password) {
    return res.status(400).json({
      success: false,
      error: "Wrong details please check at once",
    });
  }
  let token: string;
  try {
    //  Creating jwt token

    console.log("Existing User:", existingUser);
    token = sign(
      { _id: existingUser._id, email: existingUser.email, userGroup: existingUser.userGroup },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "24h",
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: "Error! Something went wrong.",
    });
  }

  return res.status(200).json({
    success: true,
    // eslint-disable-next-line no-use-before-define
    data: {
      userId: existingUser._id,
      email: existingUser.email,
      token,
    },
  });
}

/** TOKEN DECODER
  function parseJwt(token: string) {
      var base64Payload = token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      return JSON.parse(payload.toString());
    }
    console.log('decoded jwt', parseJwt(token));
 */
