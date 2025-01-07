import React, { useEffect, useState } from "react";
import style from "../../css/likeThBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../api/postapi";
import { setUserPostList } from "../../redux/userSlice";
import Post from "../post/Post";
import { Link, useNavigate } from "react-router-dom";

export default function UserPostLists() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const username = user?.username;
  const [currentPage, setCurrentPage] = useState(0);
  const userPostData = useSelector((state) => state.user.postList);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserPostsList = async () => {
      if (username) {
        try {
          const userPostData = await fetchUserPosts(username, currentPage, 6);
          dispatch(setUserPostList(userPostData));
        } catch (error) {
          console.error("벌레컷 : ", error);
        }
      }
    };
    fetchUserPostsList();
  }, [username, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //유저가 글 더 쓰면 페이지 추가되게
  if (!userPostData?.content) {
    return <div>로딩 중...</div>;
  }
  const handlePostClick = (postId) => {
    navigate(`/detail/${postId}`, { replace: true }); // replace: true를 추가하여 절대 경로로 이동
  };

  return (
    <div className={style.likeContainer}>
      <h1 className={style.title}>#{username}</h1>
      <div className={style.grid}>
        {userPostData.content
          .slice(currentPage * 6, (currentPage + 1) * 6) // 현재 페이지에 해당하는 6개 항목만 표시
          .map((post) => (
            <div
              onClick={() => handlePostClick(post.id)}
              key={post.id}
              className={style.postCard}
            >
              <Post id={post.id} image={post.image} title={post.title} />
            </div>
          ))}
      </div>
      {userPostData.totalPages > 0 && (
        <div className={style.pagination}>
          {[...Array(Math.ceil(userPostData.content.length / 6))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`${style.page_button} ${
                  currentPage === index ? style.active : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
