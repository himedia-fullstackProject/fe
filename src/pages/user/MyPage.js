import React from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/mypage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserLikes } from "../../api/likesApi";
import { setLikesList } from "../../redux/userSlice";
import { data } from "autoprefixer";

export default function MyPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const user = userList?.[0];
  const nav = useNavigate();
  const userId = user?.user_id;

  const getUserLikes = async () => {
    try {
      if (!userId) {
        console.error("사용자 ID가 없습니다", userList);
        return false;
      }
      const likesData = await fetchUserLikes(userId); // 서버에서 불러온 api
      dispatch(setLikesList(likesData)); // 리덕스 빈껍데기
      console.log("좋아요~", likesData);
    } catch (error) {
      console.error("좋아요가 싫어요가 되었다 ", error);
    }
  };

  const getJoinDate = (user) => {
    if (!user || !user.joinDate) return "";
    return `${user.joinDate[0]}-${user.joinDate[1]}-${user.joinDate[2]}`;
  };
  const getUsername = (user) =>
    user && user.username ? user.username : "GUEST";
  const getNickname = (user) =>
    user && user.nickname ? user.nickname : "Guest";

  const handleGoToLikes = async () => {
    const successLikes = await getUserLikes();
    // 이놈이 실행되면서 api호출-> 리덕스 like어쩌구 저장소에 data가 들어옴
    if (successLikes) {
      nav("/userlikes"); // 데이터 로드가 성공되면 likes페이지로 이동
      console.log("굿굿");
    }
  };

  const handleGoToMyFeed = () => {
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
