import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/user/posts'; // 사용자 포스트 API URL

// 사용자 포스트 목록 가져오기
export const fetchUserPosts = createAsyncThunk('user/fetchUserPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// userSlice 수정
const userSlice = createSlice({
    name: "users",
    initialState: {
        userInfoList: [],
        isLoggedIn: false,
        currentUser: null,
        jwtToken: null,
        role: null,
        userPosts: [],
    },
    reducers: {
        // 기존 리듀서...
        setUserPosts: (state, action) => {
            state.userPosts = action.payload; // 사용자 포스트 목록 설정
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.userPosts = action.payload; // 사용자 포스트 목록 업데이트
            });
    },
});

// 액션 내보내기
export const {
    addUserInfo,
    clearUserInfo,
    login,
    logout,
    saveJwtToken,
    setRole,
    setUserPosts,
} = userSlice.actions;

export default userSlice.reducer;
