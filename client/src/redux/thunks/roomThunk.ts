import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RoomData } from "../Interfaces";

const baseURL: string = "https://chat-service-twai.onrender.com/api/room";

export const CreateRoomThunk = createAsyncThunk(
  "room/create",
  async (roomData: RoomData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/create`, roomData, {
        withCredentials: true,
      });
      const { message, room } = res.data;
      return { message, room };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Creating room failed"
        );
      }
    }
  }
);

export const GetRoomsThunk = createAsyncThunk(
  "room/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/get`, {
        withCredentials: true,
      });

      console.log(res);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Fetching rooms failed"
        );
      }
    }
  }
);

export const SpecificRoomThunk = createAsyncThunk(
  "room/one",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/get/${id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Fetching room failed"
        );
      }
    }
  }
);
