import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../../css/detail.module.css";
import { fetchPostDetail } from "../../api/postapi"; 
import LikeButton from "../../components/LikeButton";

export default function Detail() {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const userId = useSelector((state) => state.user.currentUser?.userId);

  // 하드코딩된 서브카테고리 이름
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

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPostDetail(id);
        setPostDetail(postData);
      } catch (error) {
        console.error("포스트 로딩 실패:", error);
      }
    };

    getPostDetail();
  }, [id]);

  if (!postDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  // 서브카테고리 ID로 서브카테고리 이름 가져오기
  const getSubCategoryName = () => {
    return subCategoryNames[postDetail.subCategoryId] || ''; // 해당 ID에 맞는 이름 반환
  };

  return (
    <div className={style.detailContainer}>
      <div className={style.category}>#{getSubCategoryName()}</div> {/* 서브카테고리 이름 출력 */}

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
        <button className={style.editButton}>수정 하기</button>
        <button className={style.deleteButton}>삭제 하기</button>
      </div>
    </div>
  );
}
