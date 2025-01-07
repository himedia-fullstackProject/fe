// src/api/postapi.js
import apiClient from './api'; // apiClient를 가져오는 경로를 확인하세요

// 모든 포스트 가져오기 (인증 필요 없음) 페이징있음
export const fetchPost = async () => {
    try {
      const response = await apiClient.get('/api/posts/all', {
        headers: {
          Authorization: '', // 인증 헤더 제거
        },
      });
      return response.data.content; // content 배열만 반환
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error; // 에러를 상위로 전달
    }
  };
  

// 모든 포스트 가져오기 (인증 필요 없음) 페이징없음
export const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/api/posts/all2', {
        headers: {
          Authorization: '', // 인증 헤더 제거
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error; // 에러를 상위로 전달
    }
  };

// 포스트 추가하기
export const addPost = async (post, token) => {
  try {
    const response = await apiClient.post('/api/posts', post, {
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

// 모든 카테고리 가져오기 (인증 필요 없음)
export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/api/categories', {
          headers: {
            Authorization: '', // 인증 헤더 제거
          },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error; // 에러를 상위로 전달
    }
};

  