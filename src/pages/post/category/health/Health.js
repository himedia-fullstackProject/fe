// src/components/CategoryPages/Health.js
import React, { useEffect, useState } from "react";
import { fetchPost } from "../../../../api/postapi"; // 모든 포스트를 가져오는 함수
import styles from "../../../../css/thbox.module.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import BurgerMenu from "../../../../components/BurgerMenu";

const Health = () => {
  const mainCategoryId = 3; // 하드코딩된 mainCategoryId
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const [subCategories, setSubCategories] = useState([]); // 서브 카테고리 상태
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 6; // 페이지당 포스트 수
  const navigate = useNavigate(); // navigate 함수 생성

  useEffect(() => {
    const loadPostsAndSubCategories = async () => {
      try {
        const postsResponse = await fetchPost(); // 모든 포스트 가져오기
        console.log(postsResponse); // API 응답 확인

        if (Array.isArray(postsResponse)) {
          setPosts(postsResponse); // 포스트 상태 설정
        } else {
          setPosts([]); // content가 배열이 아닌 경우 빈 배열 설정
        }

        // 서브 카테고리 가져오기 (예시로 하드코딩된 서브 카테고리 사용)
        const subCategoriesResponse = [
          { id: 8, name: "health", mainCategoryId: 3 },
        ];

        // 메인 카테고리 ID에 해당하는 서브 카테고리만 필터링
        const filteredSubCategories = subCategoriesResponse.filter(
          (subCategory) => subCategory.mainCategoryId === mainCategoryId
        );
        setSubCategories(filteredSubCategories); // 필터링된 서브 카테고리 상태 설정
      } catch (error) {
        console.error("포스트를 가져오는 중 오류 발생:", error);
        setError("포스트를 불러오는 데 실패했습니다.");
      }
    };

    loadPostsAndSubCategories();
  }, [mainCategoryId]);

  // 서브 카테고리별 포스트 분류
  const postsBySubCategory = subCategories.reduce((acc, subCategory) => {
    // 각 서브 카테고리에 대해 mainCategoryId와 subCategoryId가 일치하는 포스트만 필터링
    const filteredPosts = posts.filter(
      (post) =>
        post.subCategoryId === subCategory.id &&
        post.mainCategoryId === mainCategoryId
    );

    // 작성일 기준으로 정렬 (가정: post.createdAt이 작성일을 나타내는 필드)
    const sortedPosts = filteredPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // 모든 포스트를 저장
    acc[subCategory.id] = sortedPosts;
    return acc;
  }, {});

  // 현재 페이지에 해당하는 포스트 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 현재 페이지에 표시할 포스트
  const currentPostsBySubCategory = Object.keys(postsBySubCategory).reduce(
    (acc, subCategoryId) => {
      acc[subCategoryId] = postsBySubCategory[subCategoryId].slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      return acc;
    },
    {}
  );

  // 전체 포스트 수 계산
  const totalPosts = Object.values(postsBySubCategory).reduce(
    (total, posts) => total + posts.length,
    0
  );
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePostClick = (id) => {
    navigate(`/detail/${id}`); // 포스트 ID를 기반으로 디테일 페이지로 이동
  };

  return (
    <div className={styles.box_container}>
      <BurgerMenu />
      {error && <p className={styles.error}>{error}</p>}
      {subCategories.length === 0 && (
        <p>해당 카테고리에 서브 카테고리가 없습니다.</p>
      )}
      {subCategories.map((subCategory) => (
        <div key={subCategory.id}>
          <h3 className={styles.title}>{subCategory.name}</h3>
          <div className={styles.grid}>
            {currentPostsBySubCategory[subCategory.id]?.map((post) => (
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
            {currentPostsBySubCategory[subCategory.id]?.length === 0 && (
              <p>포스트가 없습니다.</p>
            )}
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`${styles.page_button} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Health;
