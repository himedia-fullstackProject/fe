// src/pages/post/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostById } from '../../api/api'; // 수정된 경로

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const postData = await fetchPostById(id);
                setPost(postData);
            } catch (error) {
                console.error("포스트 조회 중 오류 발생:", error);
                setError("포스트를 불러오는 데 실패했습니다.");
            }
        };
        loadPost();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <img src={post.image} alt={post.title} />
                    <p>{post.description}</p>
                    <p>Tags: {post.tag1}, {post.tag2}, {post.tag3}</p>
                    <p>작성자: {post.userNickname}</p>
                    <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <Link to={`/update/${post.id}`}>Edit Post</Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
