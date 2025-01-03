import React, { useState } from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/thbox.module.css";

export default function UserPostLists() {
  const [userPosts, setUserPosts] = useState([]);
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
  ];
  return (
    <div className={style.box_container}>
      <h1 className={style.title}>#USER_ID </h1>
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
