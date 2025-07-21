import jwt from "jsonwebtoken";
import { CustomRequest } from "./interfaces";
import { NextFunction, Response } from "express";

export const verifyUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "User not authenticated." });
    return;
  }

  try {
    const token_decode = jwt.verify(token, process.env.SECRET_KEY!);
    req.user = token_decode;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
