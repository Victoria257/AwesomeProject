import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
  photoURL: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authStateAddPhoto: (state, { payload }) => ({
      ...state,
      photoURL: payload.photoURL,
    }),
    authStateDelPhoto: (state) => ({
      ...state,
      photoURL: null,
    }),
    authSignOut: () => initialState,
  },
});

export const { authSignOut } = authSlice.actions;
