import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../../css/detail.module.css";
import { fetchPostDetail } from "../../api/postapi";
import LikeButton from "../../components/LikeButton";
import { getCategory } from "../../api/postapi";

export default function Detail() {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [categories, setCategories] = useState({
    mainCategories: [],
    subCategories: [],
  });

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPostDetail(id);
        setPostDetail(postData);
        console.log("포스트디테일", postData);
      } catch (error) {
        console.error("벌레컷 ", error);
      } finally {
        setLoading(false);
      }
    };
    getPostDetail();
  }, [id]);

  // 카테고리 정보 가져오기
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await getCategory();
        console.log("서브카테고리?", postDetail.subCategoryId);
        setCategories(categoryData);
      } catch (error) {
        console.error("카테고리 정보 로딩 실패:", error);
      }
    };
    getCategories();
  }, []);

  // 카테고리 이름 찾기
  const getCategoryName = () => {
    const subCategory = categories.subCategories.find(
      (cat) => cat.id === postDetail.subCategoryId
    );

    if (subCategory) {
      const mainCategory = categories.mainCategories.find(
        (cat) => cat.id === subCategory.mainCategoryId
      );
      return `${mainCategory?.name} > ${subCategory.name}`;
    }
    return "";
  };

  if (loading) return <div>로딩중...</div>;
  if (!postDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={style.detailContainer}>
      <div className={style.category}>#{getCategoryName}</div>

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
