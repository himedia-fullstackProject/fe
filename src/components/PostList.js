// src/pages/post/PostList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/postSlice'; // 포스트 슬라이스 경로 수정
import { Link } from 'react-router-dom';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
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
