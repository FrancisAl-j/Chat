import { Request } from "express";
import { Types } from "mongoose";

export interface Payload {
  _id: Types.ObjectId | string;
  username: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: any;
}
