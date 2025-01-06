import React, { useState } from "react";
import { likesUpdate } from "../api/likesApi";
import { useSelector, useDispatch } from "react-redux";
import { setLikesList } from "../redux/userSlice";
import style from "../css/likeThBox.module.css";

//유저 - 포스트에 관하여 좋아요 처리
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
      <img
        className={style.img}
        alt={title}
        src={image || "https://via.placeholder.com/150x150/000080"} // 이미지가 없을 경우 기본 이미지
      />
      <p className={style.post_title}>{title}</p>
      <button
        onClick={handleLikeClick}
        className={`${style.likeButton} ${isLiked ? style.liked : ""}`}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
