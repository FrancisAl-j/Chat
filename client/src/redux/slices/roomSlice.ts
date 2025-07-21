import { createSlice } from "@reduxjs/toolkit";
import type { RoomState } from "../Interfaces";
import {
  CreateRoomThunk,
  GetRoomsThunk,
  SpecificRoomThunk,
} from "../thunks/roomThunk";

const initialState: RoomState = {
  allRooms: [],
  roomId: null,
  loading: false,
  error: null,
  isCreating: false,
  roomMessage: null,
  room: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.roomId = action.payload as string;
    },
    clearRoom: (state) => {
      state.roomId = null;
      state.room = null;
    },
  },

  extraReducers: (builder) => {
    // CREATE ROOM
    builder.addCase(CreateRoomThunk.pending, (state) => {
      state.isCreating = true;
      state.error = null;
    });
    builder.addCase(CreateRoomThunk.fulfilled, (state, action: any) => {
      const { message, room } = action.payload;
      state.isCreating = false;
      state.allRooms.push(room);
      state.roomMessage = message as string;
      state.error = null;
    });
    builder.addCase(CreateRoomThunk.rejected, (state, action) => {
      state.isCreating = false;
      state.error = action.payload as string;
    });

    // GETTING ROOMS
    builder.addCase(GetRoomsThunk.fulfilled, (state, action) => {
      state.allRooms = action.payload;
    });

    // GETTING ONE ROOM
    builder.addCase(SpecificRoomThunk.fulfilled, (state, action) => {
      state.room = action.payload;
    });
  },
});

export default roomSlice.reducer;
export const { selectRoom, clearRoom } = roomSlice.actions;
