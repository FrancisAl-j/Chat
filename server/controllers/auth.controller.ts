import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { CustomRequest, Payload } from "../utils/interfaces";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, cpassword } = req.body;
  if (password.trim().length < 8) {
    res
      .status(400)
      .json({ message: "Password should be more than 8 characters." });
    return;
  }

  if (cpassword !== password) {
    res.status(400).json({ message: "Password do not match." });
    return;
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Invalid credentials, please check your email or password.",
      });
      return;
    }

    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      res.status(400).json({
        message: "Invalid credentials, please check your email or password.",
      });
      return;
    }

    const userObject = user.toObject();

    const payload: Payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    generateToken(payload, res);

    const { password: hashedPassword, ...rest } = userObject;

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const checkAuth = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};

export const logout = async (req: CustomRequest, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "User logged out." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
