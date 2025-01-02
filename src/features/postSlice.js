import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/posts';

// 포스트 목록 가져오기
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// 특정 포스트 가져오기
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

// 포스트 생성
export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
});

// 포스트 업데이트
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
});

// 포스트 삭제
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// 포스트 검색
export const searchPosts = createAsyncThunk('posts/searchPosts', async (searchRequest) => {
    const response = await axios.post(`${API_URL}/search`, searchRequest);
    return response.data;
});

// 포스트 슬라이스 정의
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        post: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.post = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    },
});

// 리듀서를 내보내기
export default postsSlice.reducer;
