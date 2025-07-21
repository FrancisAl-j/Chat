import { Response } from "express";
import Message from "../models/message.model";
import { CustomRequest } from "../utils/interfaces";
import { io } from "../utils/socket";

export const createMessage = async (req: CustomRequest, res: Response) => {
  const { message, roomId } = req.body;
  try {
    const newMesage = new Message({
      message,
      roomId,
      senderId: req.user._id,
    });

    await newMesage.save();

    await newMesage.populate("senderId");

    io.to(`room-${roomId}`).emit("new-message", newMesage);
    io.emit("notification", newMesage);

    res.status(201).json(newMesage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getMeesages = async (req: CustomRequest, res: Response) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({
      roomId,
    }).populate("senderId");
    if (!messages) {
      res.status(404).json({ message: "Messages not found." });
      return;
    }

    res.status(200).json(messages);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
