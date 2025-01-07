import apiClient from "./api"; // apiClient를 가져오는 경로를 확인하세요
// 모든 포스트 가져오기
export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/api/posts/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error; // 에러를 상위로 전달
  }
};
// 특정 카테고리의 포스트 가져오기
export const fetchPostsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/api/posts?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts for category ${categoryId}:`, error);
    throw error; // 에러를 상위로 전달
  }
};
// 포스트 추가하기
export const addPost = async (post, token) => {
  try {
    const response = await apiClient.post("/api/posts", post, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add post:", error);
    throw error; // 에러를 상위로 전달
  }
};
// 포스트 수정하기
export const updatePost = async (postId, updatedPost, token) => {
  try {
    const response = await apiClient.put(`/api/posts/${postId}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update post ${postId}:`, error);
    throw error; // 에러를 상위로 전달
  }
};
// 포스트 삭제하기
export const deletePost = async (postId, token) => {
  try {
    const response = await apiClient.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete post ${postId}:`, error);
    throw error; // 에러를 상위로 전달
  }
};

export const searchTagPosts = async (tag, page = 0, size = 6) => {
  try {
    const response = await apiClient.get("/api/posts/search/tag", {
      params: {
        tag,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("태그 검색 실패:", error);
    throw error;
  }
};

export const searchPosts = async (searchRequest) => {
  try {
    const response = await apiClient.post("/api/posts/search", {
      searchTerm: searchRequest.searchTerm,
      mainCategoryId: searchRequest.mainCategoryId,
      subCategoryId: searchRequest.subCategoryId,
      searchType: searchRequest.searchType,
      page: searchRequest.page || 0,
      size: searchRequest.size || 6,
    });
    return response.data;
  } catch (error) {
    console.error("검색 실패:", error);
    throw error;
  }
};

export const fetchPostDetail = async (id) => {
  try {
    const res = await apiClient.get(`/api/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error("포스트 디텡ㄹ 살패", error);
    throw error;
  }
};