// src/actions/postActions.js
import {
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
} from '../api/api'; // apiClient에서 가져온 메서드
import apiClient from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// 포스트 목록 가져오기 액션
export const fetchPostsAction = async (page = 0, size = 10) => {
    try {
        const posts = await fetchPosts(page, size);
        return posts;
    } catch (error) {
        throw new Error('포스트 목록을 불러오는 데 실패했습니다.');
    }
};

// 특정 포스트 가져오기 액션
export const fetchPostByIdAction = async (id) => {
    try {
        const post = await fetchPostById(id);
        return post;
    } catch (error) {
        throw new Error('포스트를 불러오는 데 실패했습니다.');
    }
};

// 포스트 생성 액션
export const createPostAction = async (postDTO) => {
    try {
        const newPost = await createPost(postDTO);
        return newPost;
    } catch (error) {
        throw new Error('포스트 생성에 실패했습니다.');
    }
};

// 포스트 업데이트 액션
export const updatePostAction = async (id, postDTO) => {
    try {
        const updatedPost = await updatePost(id, postDTO);
        return updatedPost;
    } catch (error) {
        throw new Error('포스트 업데이트에 실패했습니다.');
    }
};

// 포스트 삭제 액션
export const deletePostAction = async (id) => {
    try {
        await deletePost(id);
        return id; // 삭제된 ID 반환
    } catch (error) {
        throw new Error('포스트 삭제에 실패했습니다.');
    }
};

// 포스트 검색 액션
export const searchPostsAction = async (searchRequest) => {
    try {
        const result = await searchPosts(searchRequest);
        return result;
    } catch (error) {
        throw new Error('포스트 검색에 실패했습니다.');
    }
    
};

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (userId) => {
    const response = await apiClient.get(`/api/posts/user/${userId}`); // 사용자 ID로 포스트 가져오기
    return response.data; // 포스트 목록 반환
  });