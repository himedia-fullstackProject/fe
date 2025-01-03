import apiClient from "./api";

// user엔티티에 있는 id
export const fetchUserLikes = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await apiClient.get(`/api/likes/${userId}`);
    return response.data;
  } catch (error) {
    console.error("좋아요 목록 불러오기 실패:", error);
    throw error;
  }
};
// postDTO의 userId와 postid(id)
export const likesUpdate = async (userId, id) => {
  try {
    const res = await apiClient.post("api/likes", userId, id);
    return res.data;
  } catch (error) {
    console.error("좋아요 토글 실패 ㅋ", error);
    throw error;
  }
};
