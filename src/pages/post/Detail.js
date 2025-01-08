import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 임포트
import { useSelector } from "react-redux";
import style from "../../css/detail.module.css";
import { fetchPostDetail, deletePost } from "../../api/postapi"; // deletePost API 가져오기
import LikeButton from "../../components/LikeButton";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 훅 사용
  const [postDetail, setPostDetail] = useState(null);
  const [isPostAuthor, setIsPostAuthor] = useState(false); // 포스트 작성자 여부 상태 추가

  const subCategoryNames = {
    1: "fashion",
    2: "beauty",
    3: "recipe",
    4: "hotplace",
    5: "love",
    6: "travel",
    7: "etc",
    8: "health",
  };

  const userList = useSelector((state) => state.user.userInfoList || []);
  const userId = userList.length > 0 ? userList[0]?.user_id : null; // 안전하게 user_id 가져오기
  const jwtToken = useSelector((state) => state.user.jwtToken); // JWT 토큰 가져오기

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPostDetail(id);
        setPostDetail(postData);
        // 포스트 작성자 여부 확인
        if (postData.userId && userId) {
          setIsPostAuthor(String(userId) === String(postData.userId));
        }
      } catch (error) {
        console.error("포스트 로딩 실패:", error);
      }
    };

    getPostDetail();
  }, [id, userId]); // userId를 의존성 배열에 추가

  if (!postDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  const getSubCategoryName = () => {
    return subCategoryNames[postDetail.subCategoryId] || "";
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`); // 수정 페이지로 이동
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("이 게시글을 정말 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deletePost(id, jwtToken); // 포스트 삭제 요청
        alert("게시글이 삭제되었습니다.");
        navigate("/"); // 홈으로 리다이렉트
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className={style.detailContainer}>
      <div className={style.category}>#{getSubCategoryName()}</div>
      <div className={style.postHeader}>
        <h1 className={style.title}>{postDetail.title}</h1>

        <div className={style.postInfo}>
          <span>by {postDetail.username}</span>
          <span className={style.date}>{postDetail.createdAt}</span>
          <LikeButton postId={id} userId={userId} likes={postDetail.likes} />
        </div>

        <div className={style.tags}>
          {[postDetail.tag1, postDetail.tag2, postDetail.tag3]
            .filter(Boolean)
            .map((tag, index) => (
              <span key={index} className={style.tag}>
                #{tag}
              </span>
            ))}
        </div>
      </div>
      <div className={style.postContent}>
        <img src={postDetail.image} className={style.mainImage} />

        <div className={style.content}>
          <p>{postDetail.description}</p>
        </div>
      </div>
      <div className={style.actionButtons}>
        {userId && isPostAuthor ? (
          <>
            <button className={style.editButton} onClick={handleEditClick}>
              수정 하기
            </button>
            <button className={style.deleteButton} onClick={handleDeleteClick}>
              삭제 하기
            </button>
          </>
        ) : (
          <p></p> // 버튼이 표시되지 않을 때 메시지
        )}
      </div>
    </div>
  );
}
