import React, { useEffect } from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/mypage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserLikes } from "../../api/likesApi";
import { setLikesList, setUserPostList } from "../../redux/userSlice";
import LikeThBox from "../../components/LikeThBox";
import { fetchPosts } from "../../api/postapi";

export default function MyPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const likedList = useSelector((state) => state.user.likedList);
  const postList = useSelector((state) => state.user.postList);
  const user = userList?.[0];
  const nav = useNavigate();

  // 컴포넌트 마운트 시 좋아요 데이터 자동 로드
  useEffect(() => {
    if (user?.username) {
      getUserLikes(user.username);
      getUserPosts(user.username);
    }
  }, [user]);

  const getUserLikes = async (username) => {
    try {
      if (!username) {
        console.error("사용자 이름이 없습니다");
        return false;
      }
      const likesData = await fetchUserLikes(username);
      dispatch(setLikesList(likesData));
      console.log("좋아요 데이터 로드 성공:", likesData);
      return true;
    } catch (error) {
      console.error("좋아요 데이터 로드 실패:", error);
      return false;
    }
  };

  const getUserPosts = async (username) => {
    try {
      if (!username) {
        console.error("유저 아름 없음");
        return false;
      }
      const userPostData = await fetchPosts(username);
      dispatch(setUserPostList(userPostData));
      console.log("성공성공", userPostData);
      return true;
    } catch (error) {
      console.error("으앙 실패", error);
      return false;
    }
  };

  const getJoinDate = (user) => {
    if (!user?.joinDate) return "";
    return `${user.joinDate[0]}-${user.joinDate[1]}-${user.joinDate[2]}`;
  };

  const getUsername = (user) => user?.username || "GUEST";
  const getNickname = (user) => user?.nickname || "Guest";

  const handleGoToLikes = async () => {
    try {
      const successLikes = await getUserLikes(user?.username);
      if (successLikes) {
        nav("/userlikes");
      }
    } catch (error) {
      console.error("좋아요 페이지 이동 중 에러:", error);
    }
  };

  const handleGoToMyFeed = async () => {
    try {
      const successPosts = await getUserPosts(user?.username);
      if (successPosts) {
        nav("/userpostlists");
      }
    } catch (error) {
      console.error("user Post  페이지 이동 중 에러:", error);
    }
  };

  return (
    <div className={style.mypage_container}>
      <div className={style.header}>
        <h1>#WELCOME, {getUsername(user).toUpperCase()}!</h1>
        <div className={style.user_info}>
          <div className={style.user_nick}>
            <span>{getNickname(user)}</span> 님
          </div>
          <div className={style.join_info}>
            가입날짜: {getJoinDate(user)} <br />
          </div>
        </div>
      </div>

      <div className={style.buttons}>
        <button className={style.like_button} onClick={handleGoToLikes}>
          좋아요 누른 글
        </button>
        <button className={style.myfeed_button} onClick={handleGoToMyFeed}>
          MY FEED
        </button>
      </div>

      <h2>#최근 작성 글</h2>
      <div className={style.thumbnails}>
        <ThBox />
        <ThBox />
        <ThBox />
      </div>

      <h2>#LIKES</h2>
      <div className={style.thumbnails}>
        {likedList?.content?.slice(0, 3).map((post) => (
          <LikeThBox
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
          />
        ))}
        {(!likedList?.content || likedList.content.length === 0) && (
          <p>좋아요한 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
