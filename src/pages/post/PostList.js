// src/components/PostList.js
import React from "react";
import { useSelector } from "react-redux";

const PostList = ({ categoryId }) => {
  const posts = useSelector((state) => state.posts.posts); // 리덕스에서 포스트 목록 가져오기
  const error = useSelector((state) => state.posts.error); // 에러 상태 가져오기

  if (error) {
    return <p>Error: {error}</p>; // 에러 메시지 표시
  }

  // 카테고리 ID에 따라 포스트 필터링
  const filteredPosts = categoryId
    ? posts.filter((post) => post.categoryId === categoryId).slice(0, 3) // 3개씩 표시
    : posts; // 카테고리 ID가 없으면 모든 포스트 표시

  return (
    <div className="post-list">
      {filteredPosts.length === 0 ? (
        <p>No posts available.</p> // 포스트가 없을 때 메시지 표시
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.imageUrl} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
