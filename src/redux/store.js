// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice'; 
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer, // posts 슬라이스 추가
        categories: categoryReducer,
    },
});

export default store;
