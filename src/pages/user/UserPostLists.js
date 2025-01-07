import React, { useEffect, useState } from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/thbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../api/postapi";
import { setUserPostList } from "../../redux/userSlice";

export default function UserPostLists() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const username = user?.username;
  const [currentPage, setCurrentPage] = useState(0);
  const userPostData = useSelector((state) => state.user.postList);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (username) {
        try {
          const userPostData = await fetchPosts(username, currentPage);
          dispatch(setUserPostList(userPostData));
        } catch (error) {
          console.error("벌레컷 : ", error);
        }
      }
    };
    fetchUserPosts();
  }, [username, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //유저가 글 더 쓰면 페이지 추가되게
  if (!userPostData?.content) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={style.likeContainer}>
      <h1 className={style.title}>#{username}</h1>
      <div className={style.grid}>
        {userPostData.content.map((post) => (
          <ThBox
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
          />
        ))}
      </div>

      {userPostData.totalPages > 0 && (
        <div className={style.pagination}>
          {[...Array(userPostData.totalPages)].map((_, index) => (
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
