import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", RoomSchema, "Room");

export default Room;
