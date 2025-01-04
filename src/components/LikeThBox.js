import React, { useState } from "react";
import { likesUpdate } from "../api/likesApi";
import { useSelector, useDispatch } from "react-redux";
import { setLikesList } from "../redux/userSlice";
import style from "../css/likeThBox.module.css";
import ThBox from "./ThBox";

export default function LikeThBox({ id, image, title, author }) {
  const [isLiked, setIsLiked] = useState(true); //초기값 true
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const likeData = useSelector((state) => state.user.likedList);
  const user = userList?.[0];

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      if (!user?.user_id) {
        alert("로그인이 필요합니다!");
        return;
      }

      const result = await likesUpdate(user.user_id, id);

      // 좋아요 취소 시 목록에서 제거
      if (likeData?.content) {
        const updatedContent = likeData.content.filter(
          (post) => post.id !== id
        );
        dispatch(
          setLikesList({
            ...likeData,
            content: updatedContent,
            totalPosts: likeData.totalPosts - 1,
          })
        );
      }

      setIsLiked(false);
      console.log("좋아요 취소 완료:", result);
    } catch (error) {
      console.error("좋아요 처리 실패", error);
    }
  };

  return (
    <div className={style.likeContainer}>
      <ThBox id={id} image={image} title={title} author={author} />
      <button
        onClick={handleLikeClick}
        className={`${style.likeButton} ${isLiked ? style.liked : ""}`}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
