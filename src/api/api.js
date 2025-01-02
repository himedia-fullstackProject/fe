import axios from "axios";
import store from "../redux/store";
import { saveJwtToken } from "../redux/userSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof URLSearchParams) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const jwtToken = store.getState().user.jwtToken;
    config.headers["authorization"] = jwtToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          "http://localhost:8080/reissue",
          null,
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.headers["authorization"];
        store.dispatch(saveJwtToken(newAccessToken));
        console.log("만료된 토큰 재발급 신청");
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log("리프레쉬 토큰으로 재발급 실패");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 포스트 생성
export const createPost = async (postDTO) => {
  const response = await apiClient.post("/api/posts", postDTO);
  return response.data;
};

// 포스트 목록 가져오기
export const fetchPosts = async (page = 0, size = 10) => {
  const response = await apiClient.get(`/api/posts?page=${page}&size=${size}`);
  return response.data.content; // 포스트 목록 반환
};

// 포스트 상세 조회
export const fetchPostById = async (id) => {
  const response = await apiClient.get(`/api/posts/${id}`);
  return response.data; // 특정 포스트 반환
};

// 포스트 업데이트
export const updatePost = async (id, postDTO) => {
  const response = await apiClient.put(`/api/posts/${id}`, postDTO);
  return response.data; // 업데이트된 포스트 반환
};

// 포스트 삭제
export const deletePost = async (id) => {
  await apiClient.delete(`/api/posts/${id}`);
};

// 포스트 검색
export const searchPosts = async (searchRequest) => {
  const response = await apiClient.post('/api/posts/search', searchRequest);
  return response.data; // 검색된 포스트 목록 반환
};

export default apiClient;
