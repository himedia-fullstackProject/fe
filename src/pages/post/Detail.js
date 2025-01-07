import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../../css/detail.module.css";
import { fetchPostDetail } from "../../api/postApi";
import LikeButton from "../../components/LikeButton";

export default function Detail() {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.currentUser?.userId);

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPostDetail(id);
        setPostDetail(postData);
      } catch (error) {
        console.error("벌레컷 ", error);
      } finally {
        setLoading(false);
      }
    };
    getPostDetail();
  }, [id]);

  if (loading) return <div>로딩중...</div>;
  if (!postDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={style.detailContainer}>
      <div className={style.category}>#{postDetail.subCategory}</div>

      <div className={style.postHeader}>
        <h1 className={style.title}>{postDetail.title}</h1>

        <div className={style.postInfo}>
          <span>by{postDetail.username}</span>
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
