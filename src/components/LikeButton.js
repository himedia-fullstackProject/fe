// components/LikeButton.js
import React, { useState, useEffect } from "react";
import styles from "../css/LikeButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLikesList } from "../redux/userSlice";
import { likesUpdate } from "../api/likesApi";

const LikeButton = ({ postId, userId }) => {
  const dispatch = useDispatch();
  const likedList = useSelector((state) => state.user.likedList) || [];

  const isLiked = likedList?.some(
    (like) => like.postId === postId && like.userId === userId
  );

  const handleLikeClick = async (e) => {
    e.preventDefault(); // Link 내부에서 사용될 때 페이지 이동 방지
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await likesUpdate(userId, postId);
      // 현재 좋아요 목록을 기반으로 업데이트
      const newLikedList = isLiked
        ? likedList.filter(
            (like) => !(like.postId === postId && like.userId === userId)
          )
        : [...likedList, { postId, userId }];

      dispatch(setLikesList(newLikedList));
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <div
      className={styles.likeButton}
      onClick={handleLikeClick}
      role="button"
      tabIndex={0}
    >
      <span className={`${styles.heart} ${isLiked ? styles.liked : ""}`}>
        {isLiked ? "❤️" : "🤍"}
      </span>
      {/* <span>{likesCount}</span> */}
    </div>
  );
};

export default LikeButton;
