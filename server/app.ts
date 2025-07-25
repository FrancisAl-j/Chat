import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./utils/config";
import authRouter from "./routers/auth.router";
import roomRouter from "./routers/room.router";
import messageRouter from "./routers/message.router";
import { app, server } from "./utils/socket";

app.use(
  cors({
    origin: "https://chatglobal-socket.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//? AUTHENTICATION
app.use("/api/auth", authRouter);

//? ROOM
app.use("/api/room", roomRouter);

//? MESSAGE
app.use("/api/message", messageRouter);

const PORT = Number(process.env.PORT!) || 3000;

server.listen(PORT, () => {
  console.log(`Port connected to http://localhost:${PORT}`);
  connectDb();
});

console.log(process.env.SECRET_KEY);
