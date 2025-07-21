import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../Interfaces";
import {
  CheckThunk,
  LoginThunk,
  RegisterThunk,
  SignoutThunk,
} from "../thunks/authThunk";

const initialState: UserState = {
  user: null,
  loggingIn: false,
  signingUp: false,
  loginError: null,
  signupError: null,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(RegisterThunk.pending, (state) => {
      state.signingUp = true;
      state.signupError = null;
    });
    builder.addCase(RegisterThunk.fulfilled, (state, action) => {
      state.signingUp = false;
      state.message = action.payload;
      state.signupError = null;
    });
    builder.addCase(RegisterThunk.rejected, (state, action) => {
      state.signingUp = false;
      state.message = null;
      state.signupError = action.payload as string;
    });

    // LOGIN
    builder.addCase(LoginThunk.pending, (state) => {
      state.loggingIn = true;
      state.loginError = null;
    });
    builder.addCase(LoginThunk.fulfilled, (state, action) => {
      state.loggingIn = false;
      state.user = action.payload;
      state.loginError = null;
    });
    builder.addCase(LoginThunk.rejected, (state, action) => {
      state.loggingIn = false;
      state.user = null;
      state.loginError = action.payload as string;
    });

    // CHECKIN AUTHENTICATION
    builder.addCase(CheckThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // LOGGING OUT
    builder.addCase(SignoutThunk.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;

export const { closeMessage } = authSlice.actions;
