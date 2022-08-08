import { NextFunction, Response, Request } from "express";

export default function checkMiddle(opt: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.locals.mode = opt.mode;
    res.locals.action = opt.action;
    res.locals.groups = opt.groups;
    next();
  };
}
