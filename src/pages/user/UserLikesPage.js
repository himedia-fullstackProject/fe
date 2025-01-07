import React, { useEffect, useState } from "react";
import style from "../../css/likeThBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikes } from "../../api/likesApi";
import LikeThBox from "../../components/LikeThBox";
import { setLikesList } from "../../redux/userSlice";

export default function UserLikesPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const username = user?.username;
  const [currentPage, setCurrentPage] = useState(0);
  const likeData = useSelector((state) => state.user.likedList);

  useEffect(() => {
    const fetchLikes = async () => {
      if (username) {
        try {
          const likesData = await fetchUserLikes(username, currentPage);
          dispatch(setLikesList(likesData));
        } catch (error) {
          console.error("좋아요 데이터 로드 실패:", error);
        }
      }
    };

    fetchLikes();
  }, [username, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!likeData?.content) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={style.likesContainer}>
      <h1 className={style.title}>#LIKES</h1>
      <div className={style.grid}>
        {likeData.content.map((post) => (
          <LikeThBox
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            author={post.userNickname}
          />
        ))}
      </div>

      {likeData.totalPages > 0 && (
        <div className={style.pagination}>
          {[...Array(likeData.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`${style.page_button} ${
                currentPage === index ? style.active : ""
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
