// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice'; // 인증 슬라이스 추가

export const store = configureStore({
    reducer: {
        auth: authSlice, // 인증 슬라이스 추가
    },
});
