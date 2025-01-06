// src/components/ThBox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setCategories, setError } from "../redux/postSlice"; // 리듀서 임포트
import apiClient from "../api/api"; // API 클라이언트 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import PostList from "../pages/post/PostList"; // PostList 컴포넌트 임포트

const ThBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate로 변경
  const posts = useSelector((state) => state.posts.posts);
  const categories = useSelector((state) => state.posts.categories);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        const postsResponse = await apiClient.get("/api/posts/all");
        const categoriesResponse = await apiClient.get("/api/categories");
        dispatch(setPosts(postsResponse.data));
        dispatch(setCategories(categoriesResponse.data));
      } catch (error) {
        dispatch(setError(error.message)); // 에러 상태 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchPostsAndCategories();
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`); // navigate로 변경
  };

  return (
    <div>
      {loading ? ( // 로딩 상태
        <p>Loading...</p>
      ) : categories.length === 0 ? ( // 카테고리 없음
        <p>No categories available.</p>
      ) : (
        categories.map((category) => (
          <div key={category.id}>
            <h2 onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
              {category.name}
            </h2>
            <PostList categoryId={category.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ThBox;
