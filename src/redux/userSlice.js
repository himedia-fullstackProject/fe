import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLikes } from "../api/likesApi";
import { useDispatch } from "react-redux";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userInfoList: [],
    isLoggedIn: false,
    currentUser: null,
    jwtToken: null,
    role: null,
    likedList: [],
    postList: [],
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfoList.push(action.payload);
    },
    clearUserInfo: (state) => {
      state.userInfoList = [];
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      // state.likedList = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.jwtToken = null;
      state.currentUser = null;
      state.likedList = [];
    },
    saveJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLikesList: (state, action) => {
      state.likedList = action.payload;
    },
    setUserPostList: (state, action) => {
      state.postList = action.payload;
    },
  },
});
//user가 로그인을 하면 like 리스트 안에 likes list api 호출하여 보여지게 함

export const {
  addUserInfo,
  clearUserInfo,
  login,
  logout,
  saveJwtToken,
  setRole,
  setLikesList,
  setUserPostList,
} = userSlice.actions;
export default userSlice.reducer;