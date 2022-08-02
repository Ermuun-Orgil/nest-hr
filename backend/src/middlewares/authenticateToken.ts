import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authenticateToken is running");
  const { token } = req.body;
  if (!token) {
    return res.status(200).json({ success: false, message: "Error! token is not provided!" });
  }
  try {
    // const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided or Inviled Token" });
    }
    verify(token, process.env.JWT_SECRET || "", (err: any, user: any) => {
      // console.log(err);

      if (err) return res.status(401).json({ message: "Inviled Token", error: err });

      req.body.user = user;
      next();
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Expired token" });
      return;
    }
    res.status(500).json({ message: "Failed to authenticate user" });
    return;
  }
};
