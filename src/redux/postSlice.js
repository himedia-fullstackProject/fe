import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/api'; // API 클라이언트 가져오기

// 포스트 목록을 가져오는 비동기 액션
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await apiClient.get('/api/posts'); // 전체 포스트 가져오기
  return response.data; // 포스트 목록 반환
});

// 포스트 생성 비동기 액션
export const createPost = createAsyncThunk('posts/createPost', async (postDTO) => {
  const response = await apiClient.post('/api/posts', postDTO); // 포스트 생성
  return response.data; // 생성된 포스트 반환
});

// 포스트 업데이트 비동기 액션
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postDTO }) => {
  const response = await apiClient.put(`/api/posts/${id}`, postDTO); // 포스트 업데이트
  return response.data; // 업데이트된 포스트 반환
});

// 포스트 삭제 비동기 액션
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await apiClient.delete(`/api/posts/${id}`); // 포스트 삭제
  return id; // 삭제된 포스트의 ID 반환
});

// 포스트 슬라이스 정의
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 요청 상태 (idle, loading, succeeded, failed)
    error: null, // 오류 상태
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload; // 포스트 목록 업데이트
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload); // 새로 생성된 포스트 추가
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id); // 수정할 포스트 인덱스 찾기
        if (index !== -1) {
          state.posts[index] = action.payload; // 해당 포스트 업데이트
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload); // 삭제된 포스트 제거
      });
  },
});

// 액션 내보내기
export const { } = postSlice.actions; // 필요한 액션이 있다면 여기서 내보내기

export default postSlice.reducer; // 리듀서 내보내기
