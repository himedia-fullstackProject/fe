import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from '../api/postapi'; // API에서 포스트를 가져오는 함수

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetchPosts();
    return response.content; // API 응답에서 포스트 목록 반환
  }
);

const initialState = {
  categories: [],
  subcategories: [],
  posts: [],
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload; // 포스트 목록 설정
        state.error = null; // 에러 초기화
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.error = "포스트를 불러오는 데 실패했습니다."; // 에러 메시지 설정
      });
  },
});

// 액션 생성자 내보내기
export const {
  setCategories,
  setSubcategories,
  createPost,
  updatePost,
  deletePost,
  setError,
} = postSlice.actions;

export default postSlice.reducer;
