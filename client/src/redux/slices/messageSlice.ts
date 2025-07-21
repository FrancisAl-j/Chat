import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "../Interfaces";
import { CreateMessageThunk, GetMessagesThunk } from "../thunks/messageThunk";

const initialState: MessageState = {
  messages: [],
  loadingMessages: false,
  notif: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    liveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    showNotif: (state) => {
      state.notif = true;
    },
    clearNotif: (state) => {
      state.notif = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(CreateMessageThunk.fulfilled, (state, action) => {
      //state.messages.push(action.payload);
    });

    builder.addCase(GetMessagesThunk.pending, (state) => {
      state.loadingMessages = true;
    });
    builder.addCase(GetMessagesThunk.fulfilled, (state, action) => {
      state.loadingMessages = false;
      state.messages = action.payload;
    });
  },
});

export default messageSlice.reducer;
export const { clearMessages, liveMessage, showNotif, clearNotif } =
  messageSlice.actions;
