// src/components/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../../api/postapi'; // API에서 포스트를 가져오는 함수
import styles from '../../../css/thbox.module.css';

const CategoryPage = () => {
  const { id } = useParams(); // URL 파라미터에서 카테고리 ID 가져오기
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const [subCategories, setSubCategories] = useState([]); // 서브 카테고리 상태
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPostsAndSubCategories = async () => {
      try {
        const postsResponse = await fetchPosts(); // 모든 포스트 가져오기
        console.log(postsResponse); // API 응답 확인

        if (Array.isArray(postsResponse.content)) {
          setPosts(postsResponse.content); // 포스트 상태 설정
        } else {
          setPosts([]); // content가 배열이 아닌 경우 빈 배열 설정
        }

        // 서브 카테고리 가져오기 (예시로 하드코딩된 서브 카테고리 사용)
        const subCategoriesResponse = [
          { id: 1, name: 'Sub Category 1', mainCategoryId: 1 },
          { id: 2, name: 'Sub Category 2', mainCategoryId: 1 },
          { id: 3, name: 'Sub Category 3', mainCategoryId: 2 },
          { id: 4, name: 'Sub Category 4', mainCategoryId: 2 },
        ];

        // 메인 카테고리 ID에 해당하는 서브 카테고리만 필터링
        const filteredSubCategories = subCategoriesResponse.filter(subCategory => subCategory.mainCategoryId === parseInt(id));
        setSubCategories(filteredSubCategories); // 필터링된 서브 카테고리 상태 설정
      } catch (error) {
        console.error("포스트를 가져오는 중 오류 발생:", error);
        setError('포스트를 불러오는 데 실패했습니다.');
      }
    };

    loadPostsAndSubCategories();
  }, [id]);

  // 서브 카테고리별 포스트 분류
  const postsBySubCategory = subCategories.reduce((acc, subCategory) => {
    acc[subCategory.id] = posts.filter(post => post.subCategoryId === subCategory.id);
    return acc;
  }, {});

  return (
    <div className={styles.box_container}>
      {error && <p className={styles.error}>{error}</p>}
      {subCategories.map(subCategory => (
        <div key={subCategory.id}>
          <h3 className={styles.title}>{subCategory.name}</h3>
          <div className={styles.grid}>
            {postsBySubCategory[subCategory.id]?.slice(0, 3).map(post => (
              <div key={post.id} className={styles.post}>
                <img src={post.image} alt={post.title} className={styles.img} />
                <h4 className={styles.post_title}>{post.title}</h4>
                <p className={styles.author}>작성자: {post.username}</p>
                <div className={styles.tags}>
                  {[post.tag1, post.tag2, post.tag3].map((tag, index) => (
                    tag && <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
