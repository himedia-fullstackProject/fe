// components/LikeButton.js
import React, { useState, useEffect } from "react";
import styles from "../css/LikeButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLikesList } from "../redux/userSlice";
import { likesUpdate } from "../api/likesApi";

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();
  const likesList = useSelector((state) => state.user.likedList) || {};
  const userList = useSelector((state) => state.user.userInfoList || []);
  const userId = userList.length > 0 ? userList[0]?.user_id : null;
  const isLiked = likesList[postId] === userId || false;

  // console.log("likedList content:", likesList);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      await likesUpdate(userId, postId);
      // 객체 형태로 업데이트
      const newLikedList = { ...likesList };
      if (isLiked) {
        delete newLikedList[postId];
      } else {
        newLikedList[postId] = userId;
      }
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
