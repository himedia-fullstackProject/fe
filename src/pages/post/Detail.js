import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/api';
import errorDisplay from '../../api/errorDisplay';

const Detail = () => {
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

    return (
        <div>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <p>{post.description}</p>
            <p>태그: {post.tag1}, {post.tag2}, {post.tag3}</p>
        </div>
    );
};

export default Detail;
