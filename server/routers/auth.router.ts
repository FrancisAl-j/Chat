import { Router } from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller";
import { verifyUser } from "../utils/verifyUser";

const router = Router();

// POST
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyUser, logout);

// GET
router.get("/check", verifyUser, checkAuth);

export default router;
