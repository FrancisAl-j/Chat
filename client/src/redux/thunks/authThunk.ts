import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SigninData, SignupData } from "../Interfaces";
import axios from "axios";

const baseURL: string = "http://localhost:3000/api/auth";

export const RegisterThunk = createAsyncThunk(
  "auth/register",
  async (formData: SignupData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/register`, formData);

      return res.data?.message;
    } catch (error) {
      // Checks if the axios call is error
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Sign-up failed"
        );
      }
    }
  }
);

export const LoginThunk = createAsyncThunk(
  "auth/login",
  async (formData: SigninData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/login`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Sign-in failed"
        );
      }
    }
  }
);

export const CheckThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/check`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Checking failed"
        );
      }
    }
  }
);

export const SignoutThunk = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${baseURL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Logout failed"
        );
      }
    }
  }
);
