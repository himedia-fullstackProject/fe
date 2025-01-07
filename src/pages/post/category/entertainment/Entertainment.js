import React, { useEffect, useState } from "react";
import { fetchPost } from "../../../../api/postapi"; // API에서 포스트를 가져오는 함수
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import styles from "../../../../css/thbox.module.css";
import BurgerMenu from "../../../../components/BurgerMenu";

const Entertainment = () => {
  const navigate = useNavigate(); // navigate 함수 생성
  const mainCategoryId = 4; // 하드코딩된 mainCategoryId
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const [subCategories, setSubCategories] = useState([]); // 서브 카테고리 상태
  const [error, setError] = useState(null);

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
          { id: 5, name: "love", mainCategoryId: 4 },
          { id: 6, name: "travel", mainCategoryId: 4 },
          { id: 7, name: "etc", mainCategoryId: 4 },
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

  // 서브 카테고리 클릭 시 페이지 이동
  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/sub-category/${subCategoryId}`); // 해당 서브 카테고리 페이지로 이동
  };

  // 서브 카테고리별 포스트 분류
  const postsBySubCategory = subCategories.reduce((acc, subCategory) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.subCategoryId === subCategory.id &&
        post.mainCategoryId === mainCategoryId
    );

    const sortedPosts = filteredPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    acc[subCategory.id] = sortedPosts.slice(0, 3);

    return acc;
  }, {});

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
          <h3
            className={styles.title}
            onClick={() => handleSubCategoryClick(subCategory.id)} // 클릭 시 서브 카테고리 페이지로 이동
            style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 스타일 변경
          >
            {subCategory.name}
          </h3>
          <div className={styles.grid}>
            {postsBySubCategory[subCategory.id]?.map((post) => (
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
            {postsBySubCategory[subCategory.id]?.length === 0 && (
              <p>포스트가 없습니다.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Entertainment;
