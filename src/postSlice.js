import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

export const searchPosts = createAsyncThunk('posts/searchPosts', async (searchTerm) => {
    const response = await axios.get(`${API_URL}/search`, { params: { searchTerm } });
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        post: null,
        status: 'idle',
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
                state.posts[index] = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    },
});

export default postsSlice.reducer;
