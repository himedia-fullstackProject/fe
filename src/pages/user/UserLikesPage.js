import React, { useEffect, useState } from "react";
import style from "../../css/likeThBox.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikes } from "../../api/likesApi";
import LikeThBox from "../../components/LikeThBox";

export default function UserLikesPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const userId = user?.user_id;
  const [currentPage, setCurrentPage] = useState(0);
  const likeData = useSelector((state) => state.user.likedList);
  //likedListByUser 구조 분해 => 좋아요 포스트, 페이지

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserLikes(userId, currentPage));
    }
  }, [dispatch, userId, currentPage]);

  useEffect(() => {
    console.log("현재 좋아요 데이터:", likeData);
  }, [likeData]);
  //디버깅용

  const likedPosts = likeData?.content || []; // 좋아요 누른 포스트
  const totalPages = likeData?.totalPages || 0; // 좋아요 포스트 페이지 객체
  const isFirstPage = likeData?.firstPage || false;
  const isLastPage = likeData?.lastPage || false;

  const addLikesPage = (newPage) => {
    setCurrentPage(newPage);
    dispatch(fetchUserLikes(newPage));
  }; // 좋아요가 늘어서 한 페이지 당  6개를 넘길때 새 페이지 추가

  return (
    <div className={style.likeContainer}>
      <h1 className={style.title}>#LIKES</h1>
      <div className={style.grid}>
        {likeData?.content?.map((post) => (
          <LikeThBox
            key={post.id}
            id={post.id}
            imageUrl={post.image}
            title={post.title}
            author={post.userNickname}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={style.pagination}>
          <button
            onClick={() => addLikesPage(Math.max(0, currentPage - 1))}
            disabled={isFirstPage}
            className={style.page_button}
          >
            이전
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => addLikesPage(index)}
              className={`${style.page_button} ${
                currentPage === index ? style.active : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              addLikesPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={isLastPage}
            className={style.page_button}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
