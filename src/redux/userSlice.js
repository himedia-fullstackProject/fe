import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userInfoList: [],
    isLoggedIn: false,
    currentUser: null, // { userId, nickname, role } 형태로 저장
    jwtToken: null,
    role: null,
    likedList: [],
    postList: [],
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfoList.push(action.payload); // 사용자 정보를 리스트에 추가
    },
    clearUserInfo: (state) => {
      state.userInfoList = []; // 사용자 정보 리스트 초기화
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = {
        userId: action.payload.user_id, // user_id를 userId로 매핑
        nickname: action.payload.nickname,
        role: action.payload.role,
        username: action.payload.username,
      };
      // 필요 시 likedList 초기화
      // state.likedList = action.payload.likedList; // 필요 시 추가
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.jwtToken = null;
      state.currentUser = null; // 현재 사용자 초기화
      state.likedList = []; // 좋아요 리스트 초기화
      state.postList = []; // 게시글 리스트 초기화 (필요 시)
    },
    saveJwtToken: (state, action) => {
      state.jwtToken = action.payload; // JWT 토큰 저장
    },
    setRole: (state, action) => {
      state.role = action.payload; // 역할 저장
    },
    setLikesList: (state, action) => {
      state.likedList = action.payload; // 좋아요 리스트 저장
    },
    setUserPostList: (state, action) => {
      state.postList = action.payload; // 사용자 게시글 리스트 저장
    },
  },
});

// 액션 생성자 내보내기
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
