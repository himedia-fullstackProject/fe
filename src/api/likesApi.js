import apiClient from "./api";

// user엔티티에 있는 username
export const fetchUserLikes = async (username, page = 0) => {
  try {
    const response = await apiClient.get(`/api/likes/${username}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
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
