// src/components/Thbox.js
import React, { useEffect, useState } from "react";
import { fetchPost } from "../api/postapi"; // API에서 포스트를 가져오는 함수
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import styles from "../css/thbox.module.css";

const Thbox = () => {
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const [categories, setCategories] = useState([]); // 카테고리 상태
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsResponse = await fetchPost();
        console.log(postsResponse); // API 응답 확인

        // 응답의 content 배열에서 포스트 데이터 추출
        if (Array.isArray(postsResponse)) {
          setPosts(postsResponse); // 포스트 상태 설정
        } else {
          setPosts([]); // content가 배열이 아닌 경우 빈 배열 설정
        }

        // 카테고리 가져오기 (예시로 하드코딩된 카테고리 사용)
        const categoriesResponse = [
          { id: 1, name: "fashion/beauty" },
          { id: 2, name: "F&B" },
          { id: 3, name: "health" },
          { id: 4, name: "entertainment" },
        ];
        setCategories(categoriesResponse); // 카테고리 상태 설정
      } catch (error) {
        console.error("포스트를 가져오는 중 오류 발생:", error);
        setError("포스트를 불러오는 데 실패했습니다.");
      }
    };

    loadPosts();
  }, []);

  // 카테고리별 포스트 분류
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = posts.filter(
      (post) => post.mainCategoryId === category.id
    );
    return acc;
  }, {});

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // 해당 카테고리 페이지로 이동
  };

  const handlePostClick = (id) => {
    navigate(`/detail/${id}`); // 포스트 ID를 기반으로 디테일 페이지로 이동
  };

  return (
    <div className={styles.box_container}>
      {error && <p className={styles.error}>{error}</p>}
      {categories.map((category) => (
        <div key={category.id}>
          <h3
            className={styles.title}
            onClick={() => handleCategoryClick(category.id)}
            style={{ cursor: "pointer" }}
          >
            {category.name}
          </h3>
          <div className={styles.grid}>
            {postsByCategory[category.id]?.slice(0, 3).map((post) => (
              <div key={post.id} className={styles.post} onClick={() => handlePostClick(post.id)}>
                <img src={post.image} alt={post.title} className={styles.img} />
                <h4 className={styles.post_title}>{post.title}</h4>
                <p className={styles.author}>작성자: {post.username}</p>
                <div className={styles.tags}>
                  {[post.tag1, post.tag2, post.tag3].map(
                    (tag, index) =>
                      tag && (
                        <span key={index} className={styles.tag}>
                          #{tag}
                        </span>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Thbox;