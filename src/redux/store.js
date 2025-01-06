// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice'; // postSlice 가져오기

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer, // posts 슬라이스 추가
    },
});

export default store;
