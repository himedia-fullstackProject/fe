import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import apiClient from '../../api/api';
import errorDisplay from '../../api/errorDisplay';

const Update = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const fetchPostDetail = async () => {
        try {
            const response = await apiClient.get(`/api/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            setError("포스트를 불러오는 데 실패했습니다.");
            errorDisplay(error);
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!post) return <p>로딩 중...</p>;

    const handleSuccess = () => {
        // 수정 성공 후 처리 (ex: 포스트 목록 페이지로 리다이렉트)
    };

    return (
        <div>
            <h2>포스트 수정</h2>
            <PostForm post={post} onSuccess={handleSuccess} />
        </div>
    );
};

export default Update;
