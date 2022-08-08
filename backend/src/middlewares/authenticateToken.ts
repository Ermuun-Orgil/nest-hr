// import { Request, Response, NextFunction } from "express";
// import { verify } from "jsonwebtoken";

// export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
//   console.log("authenticateToken is running");
//   const token: string | undefined = req.headers?.authorization;

//   try {
//     // const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided or Inviled Token" });
//     }
//     verify(token, process.env.JWT_SECRET || "secret", (err: any, decoded: any) => {
//       if (err) return res.status(401).json({ message: "Inviled Token", error: err });
//       req.body.user = decoded;
//       next();
//     });
//   } catch (error: any) {
//     if (error.name === "TokenExpiredError") {
//       res.status(401).json({ message: "Expired token" });
//       return;
//     }
//     res.status(500).json({ message: "Failed to authenticate user" });
//     return;
//   }
// };
