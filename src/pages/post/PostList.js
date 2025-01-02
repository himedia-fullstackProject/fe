// src/pages/post/PostList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/postSlice';
import { Link } from 'react-router-dom';
import { fetchPosts as fetchPostsFromAPI } from '../../api/api'; // 수정된 경로

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postsData = await fetchPostsFromAPI(); // API 호출
                dispatch(fetchPosts(postsData)); // Redux 상태 업데이트
            } catch (error) {
                console.error("포스트 목록 로드 중 오류 발생:", error);
            }
        };

        if (status === 'idle') {
            loadPosts();
        }
    }, [status, dispatch]);

    return (
        <div>
            <h2>Posts</h2>
            <Link to="/write">Write a New Post</Link>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/detail/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
