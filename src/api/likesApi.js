import apiClient from "./api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLikesList } from "../redux/userSlice";

// user엔티티에 있는 id
export const fetchUserLikes =
  (userId, page = 0) =>
  async (dispatch) => {
    try {
      const response = await apiClient.get(`/api/likes/${userId}?page=${page}`);
      dispatch(setLikesList(response.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

// postDTO의 userId와 postid(id)
export const likesUpdate = async (userId, id) => {
  try {
    const res = await apiClient.post("api/likes", {
      userId: userId, // 백엔드 요청 형식에 맞춤
      id: id,
    });
    return res.data;
  } catch (error) {
    console.error("좋아요 토글 실패 ㅋ", error);
    throw error;
  }
};
