import { Response } from "express";
import Room from "../models/rooms.model";
import { CustomRequest } from "../utils/interfaces";

export const createRoom = async (req: CustomRequest, res: Response) => {
  const { name, description, tags } = req.body;
  try {
    const newRoom = new Room({
      name,
      description,
      ownerId: req.user._id,
      tags,
    });

    await newRoom.save();

    res.status(201).json({ room: newRoom, message: "Room created." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRooms = async (req: CustomRequest, res: Response) => {
  try {
    const rooms = await Room.find();
    if (rooms.length === 0) {
      res.status(404).json({ message: "Rooms not found." });
      return;
    }

    res.status(200).json(rooms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getSpecificRoom = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      res.status(404).json({ message: "Room not found." });
      return;
    }

    res.status(200).json(room);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
