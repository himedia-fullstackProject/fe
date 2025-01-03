import React from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/mypage.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const nav = useNavigate();

  const getJoinDate = (user) => {
    if (!user || !user.joinDate) return "";
    return `${user.joinDate[0]}-${user.joinDate[1]}-${user.joinDate[2]}`;
  };
  const getUsername = (user) =>
    user && user.username ? user.username : "GUEST";
  const getNickname = (user) =>
    user && user.nickname ? user.nickname : "Guest";

  const handleGoToLikes = (e) => {
    e.preventDefault();
    nav("/userlikes");
  };

  const handleGoToMyFeed = (e) => {
    e.preventDefault();
    nav("/userpostlists");
  };

  return (
    <div className={style.mypage_container}>
      <div className={style.header}>
        <h1>#WELLCOME, {getUsername(user).toUpperCase()} !</h1>
        <div className={style.user_info}>
          <div className={style.user_nick}>
            <span>{getNickname(user)}</span> 님
          </div>
          <div className={style.join_info}>
            가입날짜: {getJoinDate(user)} <br />
            작성 게시글 수: 9
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
        <ThBox />
        <ThBox />
        <ThBox />
      </div>
    </div>
  );
}
