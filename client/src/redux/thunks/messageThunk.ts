import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { MessageData } from "../Interfaces";

const baseURL: string = "https://chat-service-twai.onrender.com/api/message";

export const CreateMessageThunk = createAsyncThunk(
  "message/create",
  async (messageData: MessageData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/create`, messageData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Creating message failed"
        );
      }
    }
  }
);

export const GetMessagesThunk = createAsyncThunk(
  "message/get",
  async (roomId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/get/${roomId}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Fetching message failed"
        );
      }
    }
  }
);
