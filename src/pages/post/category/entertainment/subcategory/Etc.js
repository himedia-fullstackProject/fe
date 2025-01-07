import React, { useEffect, useState } from "react";
import { fetchPost } from "../../../../../api/postapi"; // API에서 포스트를 가져오는 함수
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import styles from "../../../../../css/thbox.module.css";
import BurgerMenu from "../../../../../components/BurgerMenu";

const Etc = () => {
  const subCategoryId = 7; // 하드코딩된 서브 카테고리 ID
  const [posts, setPosts] = useState([]); // 포스트 상태
  const [error, setError] = useState(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 6; // 페이지당 포스트 수
  const navigate = useNavigate(); // navigate 함수 생성

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsResponse = await fetchPost(); // 모든 포스트 가져오기
        if (Array.isArray(postsResponse)) {
          const filteredPosts = postsResponse.filter(
            (post) => post.subCategoryId === subCategoryId
          );
          setPosts(filteredPosts); // 포스트 상태 설정
        } else {
          setPosts([]); // content가 배열이 아닌 경우 빈 배열 설정
        }
      } catch (error) {
        console.error("포스트를 가져오는 중 오류 발생:", error);
        setError("포스트를 불러오는 데 실패했습니다.");
      }
    };

    loadPosts();
  }, [subCategoryId]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePostClick = (id) => {
    navigate(`/detail/${id}`); // 포스트 ID를 기반으로 디테일 페이지로 이동
  };

  return (
    <div className={styles.box_container}>
      <BurgerMenu />
      {error && <p className={styles.error}>{error}</p>}
      {currentPosts.length === 0 && <p>포스트가 없습니다.</p>}

      <div className={styles.grid}>
        {currentPosts.map((post) => (
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

      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Etc;
