import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserLikes } from "../../api/likesApi";
import { fetchPost } from "../../api/postapi"; // 모든 포스트를 가져오는 API
import LikeThBox from "../../components/LikeThBox";
import style from "../../css/mypage.module.css";
import { setLikesList, setUserPostList } from "../../redux/userSlice";
import Post from "../post/Post";

export default function MyPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userInfoList);
  const likedList = useSelector((state) => state.user.likedList);
  const user = userList?.[0];
  const userId = user?.user_id; // 현재 로그인한 사용자의 ID 
  const nav = useNavigate();

  // 컴포넌트 마운트 시 좋아요 데이터와 작성 글 자동 로드
  useEffect(() => {
    if (user?.username) {
      getUserLikes(user.username);
      getAllPosts(); // 모든 포스트 가져오기
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

  const getAllPosts = async () => {
    try {
      const userPostData = await fetchPost(); // 모든 포스트를 가져오는 API 호출
      console.log("fetchPost 응답 데이터:", userPostData); // 데이터 구조 확인
      dispatch(setUserPostList(userPostData)); // Redux에 포스트 데이터 저장

      // API 응답에서 content 배열을 사용하여 필터링
      const userPosts = userPostData.content || []; // content가 없으면 빈 배열 사용
      const filteredUserPosts = userPosts.filter((post) => post.userId === userId) || [];
      console.log("Filtered User Posts:", filteredUserPosts); // 필터링된 포스트 확인

      // 필터링된 포스트를 최신순으로 정렬하고, 최대 3개 가져오기
      const recentUserPosts = filteredUserPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // createdAt 필드를 기준으로 정렬
        .slice(0, 3); // 최신 3개 가져오기

      console.log("Recent User Posts:", recentUserPosts); // 최근 포스트 확인

      // 최근 포스트를 상태에 저장할 수 있다면 여기에서 상태 업데이트 가능
      dispatch(setUserPostList(recentUserPosts)); // 최근 포스트를 Redux에 저장 (선택 사항)

      return true;
    } catch (error) {
      console.error("모든 포스트 로드 실패", error);
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
      const successPosts = await getUserLikes(user?.username);
      if (successPosts) {
        nav("/userpostlists");
      }
    } catch (error) {
      console.error("user Post 페이지 이동 중 에러:", error);
    }
  };

  // Redux에서 가져온 포스트 데이터
  const allPosts = useSelector((state) => state.user.postList); // 모든 포스트 가져오기

  return (
    <div className={style.mypage_container}>
      <div className={style.header}>
        <h1>#WELCOME, {getUsername(user).toUpperCase()}!</h1>
        <div className={style.user_info}>
          <div className={style.user_nick}>
            <span>{getNickname(user)}</span> 님
          </div>
          <div className={style.join_info}>가입날짜: {getJoinDate(user)}</div>
        </div>
      </div>

      <div className={style.buttons}>
        <button className={style.like_button} onClick={handleGoToLikes}>
          좋아요 누른 글
        </button>
        {/* <button className={style.myfeed_button} onClick={handleGoToMyFeed}>
          MY FEED
        </button> */}
      </div>

      {/* <h2>#최근 작성 글</h2>
      <div className={style.thumbnails}>
        {allPosts?.content?.length > 0 ? (
          allPosts.content.filter((post) => post.userId === userId).slice(0, 3).map((post) => (
            <Post
              key={post.id}
              id={post.id}
              image={post.image}
              title={post.title}
            />
          ))
        ) : (
          <p>작성한 게시글이 없습니다.</p>
        )}
      </div> */}

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
