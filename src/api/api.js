  import axios from "axios";
  import store from "../redux/store";
  import { saveJwtToken } from "../redux/userSlice";

  // Axios 인스턴스 생성
  const apiClient = axios.create({
    baseURL: "http://localhost:8080", // 백엔드 API의 기본 URL
    headers: {
      "Content-Type": "application/json", // 기본 Content-Type
    },
    withCredentials: true, // 쿠키를 포함한 요청
  });

  // 요청 인터셉터
  apiClient.interceptors.request.use(
    (config) => {
      // URLSearchParams인 경우 Content-Type 설정
      if (config.data instanceof URLSearchParams) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      
      // JWT 토큰을 Authorization 헤더에 추가
      const jwtToken = store.getState().user.jwtToken;
      if (jwtToken) {
        config.headers["Authorization"] = jwtToken;
      }
      
      return config;
    },
    (error) => {
      // 요청 에러 처리
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  apiClient.interceptors.response.use(
    (response) => response, // 응답이 성공적인 경우 그대로 반환
    async (error) => {
      const originalRequest = error.config; // 원본 요청
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정
        try {
          // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
          const refreshResponse = await axios.post(
            "http://localhost:8080/reissue",
            null,
            { withCredentials: true }
          );
          const newAccessToken = refreshResponse.headers["authorization"];
          store.dispatch(saveJwtToken(newAccessToken)); // 새로운 액세스 토큰 저장
          console.log("만료된 토큰을 재발급 받았습니다.");
          
          // 원래 요청을 새로운 토큰으로 다시 시도
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("리프레시 토큰으로 재발급 실패:", refreshError.message);
          return Promise.reject(refreshError); // 재발급 실패 시 에러 반환
        }
      }
      return Promise.reject(error); // 다른 에러 처리
    }
  );

  // 포스트 목록 가져오기
  export const fetchPosts = async () => {
    try {
      const response = await apiClient.get("/api/posts"); // 포스트 목록 요청
      return response.data; // 포스트 목록 반환
    } catch (error) {
      console.error("포스트 목록 가져오기 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 포스트 생성
  export const createPost = async (postDTO) => {
    try {
      const response = await apiClient.post("/api/posts", postDTO); // 포스트 생성 요청
      return response.data; // 생성된 포스트 반환
    } catch (error) {
      console.error("포스트 생성 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 포스트 업데이트
  export const updatePost = async (id, postDTO) => {
    try {
      const response = await apiClient.put(`/api/posts/${id}`, postDTO); // 포스트 업데이트 요청
      return response.data; // 업데이트된 포스트 반환
    } catch (error) {
      console.error("포스트 업데이트 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 포스트 삭제
  export const deletePost = async (id) => {
    try {
      await apiClient.delete(`/api/posts/${id}`); // 포스트 삭제 요청
      return id; // 삭제된 포스트의 ID 반환
    } catch (error) {
      console.error("포스트 삭제 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 특정 포스트 가져오기
  export const fetchPostById = async (id) => {
    try {
      const response = await apiClient.get(`/api/posts/${id}`); // 특정 포스트 요청
      return response.data; // 요청한 포스트 반환 (유저 정보 제외)
    } catch (error) {
      console.error("포스트 가져오기 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 전체 포스트 가져오기
  export const fetchAllPosts = async () => {
    try {
      const response = await apiClient.get("/api/posts/all"); // 전체 포스트 요청
      return response.data; // 응답에서 유저 정보 제외
    } catch (error) {
      console.error("전체 포스트 가져오기 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  // 포스트 검색 기능 추가
  export const searchPosts = async (searchTerm) => {
    try {
      const response = await apiClient.get(`/api/posts/search?term=${searchTerm}`); // 포스트 검색 요청
      return response.data; // 검색된 포스트 반환
    } catch (error) {
      console.error("포스트 검색 실패:", error.message);
      throw error; // 에러를 상위로 전달
    }
  };

  export default apiClient; // Axios 인스턴스 내보내기
