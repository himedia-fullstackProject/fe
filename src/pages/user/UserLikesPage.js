import React, { useEffect, useState } from "react";
import style from "../../css/thbox.module.css";
import { Link } from "react-router-dom";
import ThBox from "../../components/ThBox";

export default function UserLikesPage() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dummydata = [
    {
      id: 1,
      title: "울해, 가장 많이 사랑받은 뷰티 아이템은?",
      author: "데일리뷰티가이드",
      imageUrl: "/path-to-image1.jpg",
    },
    {
      id: 2,
      title: "인스타 핫로위 8000원, 로제의 질센 아이템",
      author: "rosegosta",
      imageUrl: "/path-to-image2.jpg",
    },
    // ... 더 많은 게시물
  ];
  // useEffect(() => {
  //   fetchLikedPosts(currentPage);
  // }, [currentPage]);

  // const fetchLikedPosts = async (page) => {
  //   setLoading(true);
  //   try {
  //     // API URL 바꾸기
  //     const response = await axios.get(`/api/users/likes?page=${page}`);
  //     setLikedPosts(response.data.content);
  //     setTotalPages(response.data.totalPages);
  //   } catch (err) {
  //     setError("좋아요한 게시물을 불러오는데 실패했습니다.");
  //     console.error("Error fetching liked posts:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className={style.box_container}>
      <h1 className={style.title}>#LIKES</h1>
      <div className={style.grid}>
        {dummydata.map((post) => (
          <ThBox
            key={post.id}
            id={post.id}
            imageUrl={post.imageUrl}
            title={post.title}
            author={post.author}
          />
        ))}
      </div>

      {/* 
        {likedPosts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className={style.card}>
            <div className={style.imageWrapper}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className={style.image}
              />
            </div>
            <div className={style.content}>
              <h2 className={style.cardTitle}>{post.title}</h2>
              <p className={style.author}>by {post.author}</p>
            </div>
          </Link>
        ))} */}
      {/* </div> */}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className={style.pagination}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${style.pageButton} ${
                currentPage === index + 1 ? style.pageButtonActive : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
