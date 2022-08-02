import { NextFunction, Response, Request } from "express";

export const checkMiddle = async (req: Request, res: Response, next: NextFunction) => {
  console.log("checkMiddle is running");
  next();
};
