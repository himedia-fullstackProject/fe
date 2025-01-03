import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userInfoList: [],
    isLoggedIn: false,
    currentUser: null,
    jwtToken: null,
    role: null,
    likesList: [],
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
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.jwtToken = null;
      state.currentUser = null;
    },
    saveJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
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
} = userSlice.actions;
export default userSlice.reducer;