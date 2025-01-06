import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [], // 메인 카테고리 목록
  subcategories: [], // 서브 카테고리 목록
  posts: [], // 포스트 목록을 배열로 초기화
  error: null, // 에러 상태
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload; // 메인 카테고리 설정
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload; // 서브 카테고리 설정
    },
    setPosts: (state, action) => {
      state.posts = action.payload; // 포스트 목록 설정
    },
    addPost: (state, action) => {
      state.posts.push(action.payload); // 새 포스트 추가
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title; // 포스트 제목 수정
        post.content = content; // 포스트 내용 수정
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload); // 삭제된 포스트 필터링
    },
    setError: (state, action) => {
      state.error = action.payload; // 에러 메시지 설정
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setError,
  setCategories,
  setSubcategories,
} = postSlice.actions;

export default postSlice.reducer;
