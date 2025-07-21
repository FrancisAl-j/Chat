import { Router } from "express";
import { verifyUser } from "../utils/verifyUser";
import { createMessage, getMeesages } from "../controllers/message.controller";

const router = Router();

// POST
router.post("/create", verifyUser, createMessage);

// GET
router.get("/get/:roomId", verifyUser, getMeesages);
export default router;
