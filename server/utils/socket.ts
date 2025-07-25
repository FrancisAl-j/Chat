import { Server } from "socket.io";
import http from "http";
import express from "express";

// Initialize the app
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chatglobal-socket.vercel.app"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  // CREATE ROOM FOR EACH CHAT GROUP
  socket.on("join_room", (roomId) => {
    socket.join(`room-${roomId}`);
  });

  // LEAVE ROOM.
  socket.on("leave_room", (roomId) => {
    socket.leave(`room-${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log(`A user diconnected ${socket.id}`);
  });
});

export { io, app, server };
