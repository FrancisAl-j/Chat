import { Router } from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  createRoom,
  getRooms,
  getSpecificRoom,
} from "../controllers/room.controller";

const router = Router();

// POST
router.post("/create", verifyUser, createRoom);

// GET
router.get("/get", getRooms);
router.get("/get/:id", verifyUser, getSpecificRoom);

export default router;
