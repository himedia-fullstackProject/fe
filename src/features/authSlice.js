// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 로그인 API 경로 수정
const API_URL = 'http://localhost:8080/login';

// 로그인 API 호출
// src/features/authSlice.js
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post(API_URL, credentials); // credentials가 올바르게 전달되는지 확인
    return response.data;
});


// 인증 슬라이스 정의
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user; // 사용자 정보
                state.token = action.payload.token; // JWT 토큰
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// 리듀서를 내보내기
export const { logout } = authSlice.actions;
export default authSlice.reducer;
