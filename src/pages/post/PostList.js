// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/postapi';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchPosts();
        // API 응답의 content를 사용
        if (Array.isArray(response.content)) {
          setPosts(response.content);
        } else {
          console.error('Fetched data is not an array:', response.content);
          setError('데이터 형식이 올바르지 않습니다.');
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setError('포스트를 불러오는 데 실패했습니다.');
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>모든 포스트</h2>
      {error && <p>{error}</p>} {/* 에러 메시지 표시 */}
      <ul>
        {Array.isArray(posts) && posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
