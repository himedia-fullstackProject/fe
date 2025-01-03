import React, { useEffect, useState } from 'react';
import apiClient from '../../api/api';
import errorDisplay from '../../api/errorDisplay';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.user.jwtToken); // Redux에서 JWT 토큰 가져오기
    const userId = useSelector((state) => state.user.id); // Redux에서 사용자 ID 가져오기

    const fetchUserPosts = async () => {
        try {
            const response = await apiClient.get(`/api/posts/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            setError("포스트를 불러오는 데 실패했습니다.");
            errorDisplay(error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await apiClient.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            errorDisplay(error);
        }
    };

    useEffect(() => {
        fetchUserPosts(); // 포스트 목록 가져오기
    }, [userId, token]);

    return (
        <div>
            <h2>내 포스트</h2>
            {error && <p>{error}</p>}
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                            <button onClick={() => handleDelete(post.id)}>삭제</button>
                            <Link to={`/update/${post.id}`}>수정</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>작성한 포스트가 없습니다.</p>
            )}
        </div>
    );
};

export default PostList;
