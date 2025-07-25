import { Response } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "./interfaces";

export const generateToken = async (payload: Payload, res: Response) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY!, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return token;
};
