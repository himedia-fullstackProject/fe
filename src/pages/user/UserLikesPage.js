import React, { useEffect, useState } from "react";
import style from "../../css/thbox.module.css";
import { Link } from "react-router-dom";
import ThBox from "../../components/ThBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikes } from "../../api/likesApi";

export default function UserLikesPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const likeData = useSelector((state) => state.user.likedList);
  //likedListByUser 구조 분해 => 좋아요 포스트, 페이지

  const likedPosts = likeData?.content || []; // 좋아요 누른 포스트
  const totalPages = likeData?.totalPages || 0; // 좋아요 포스트 페이지 객체
  const isFirstPage = likeData?.firstPage || false;
  const isLastPage = likeData?.lastPage || false;

  const addLikesPage = (newPage) => {
    setCurrentPage(newPage);
    dispatch(fetchUserLikes(newPage));
  }; // 좋아요가 늘어서 한 페이지 당  6개를 넘길때 새 페이지 추가

  return (
    <div className={style.box_container}>
      <h1 className={style.title}>#LIKES</h1>
      <div className={style.grid}>
        {likedPosts.map((likedPost) => (
          <ThBox
            key={likedPost.id}
            id={likedPost.id}
            imageUrl={likedPost.image}
            title={likedPost.title}
            author={likedPost.userNickname}
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
