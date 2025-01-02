// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./redux/postSlice";
import authSlice from "./features/authSlice"; // 인증 슬라이스 추가

export const store = configureStore({
  reducer: {
    posts: postSlice,
    auth: authSlice, // 인증 슬라이스 추가
  },
});
