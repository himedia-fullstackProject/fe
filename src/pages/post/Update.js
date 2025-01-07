import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import { fetchPostDetail, updatePost } from "../../api/postapi"; // updatePost API 가져오기
import { useSelector } from "react-redux";
import styles from '../../css/WritePost.module.css'; // CSS 파일 임포트

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 훅 사용
  const [postDetail, setPostDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState(""); // 초기값을 빈 문자열로 설정
  const [subCategoryId, setSubCategoryId] = useState(""); // 초기값을 빈 문자열로 설정
  const userList = useSelector((state) => state.user.userInfoList);
  const jwtToken = useSelector((state) => state.user.jwtToken); // JWT 토큰 가져오기

  // 하드코딩된 카테고리 데이터
  const mainCategories = [
    { id: '1', categoryName: 'fashion/beauty' },
    { id: '2', categoryName: 'F&B' },
    { id: '3', categoryName: 'health' },
    { id: '4', categoryName: 'entertainment' },
  ];

  const subCategories = [
    { id: '1', subCategoryName: 'fashion', mainCategoryId: '1' },
    { id: '2', subCategoryName: 'beauty', mainCategoryId: '1' },
    { id: '3', subCategoryName: 'recipe', mainCategoryId: '2' },
    { id: '4', subCategoryName: 'hotplace', mainCategoryId: '2' },
    { id: '5', subCategoryName: 'love', mainCategoryId: '4' },
    { id: '6', subCategoryName: 'travel', mainCategoryId: '4' },
    { id: '7', subCategoryName: 'etc', mainCategoryId: '4' },
    { id: '8', subCategoryName: 'health', mainCategoryId: '3' },
  ];

  useEffect(() => {
    const getPostDetail = async () => {
      const postData = await fetchPostDetail(id);
      setPostDetail(postData);
      setTitle(postData.title);
      setImageUrl(postData.image); // 이미지 URL 설정
      setDescription(postData.description);
      setTag1(postData.tag1);
      setTag2(postData.tag2);
      setTag3(postData.tag3);
      // 주석 처리하여 포스트 수정 시 카테고리 초기화
      setMainCategoryId(""); // 초기값으로 설정
      setSubCategoryId(""); // 초기값으로 설정
    };

    getPostDetail();
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      image: imageUrl,
      description,
      tag1,
      tag2,
      tag3,
      mainCategoryId,
      subCategoryId,
    };
    await updatePost(id, updatedPost, jwtToken); // 수정 API 호출
    alert("포스트가 수정되었습니다.");
    navigate(`/detail/${id}`); // 수정 후 상세 페이지로 리다이렉트
  };

  if (!postDetail) return <div>포스트를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>포스트 수정하기</h1>
      <form onSubmit={handleUpdatePost}>
        <div className={styles.categoryContainer}>
          <select
            className={`${styles.input} ${styles.categoryInput}`}
            value={mainCategoryId}
            onChange={(e) => {
              setMainCategoryId(e.target.value);
              setSubCategoryId(''); // 메인 카테고리 변경 시 서브 카테고리 초기화
            }}
            required
          >
            <option value="" disabled>대분류 카테고리 선택</option> {/* 플레이스홀더 추가 */}
            {mainCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <select
            className={`${styles.input} ${styles.categoryInput}`}
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>소분류 카테고리 선택</option> {/* 플레이스홀더 추가 */}
            {subCategories
              .filter(subCategory => subCategory.mainCategoryId === mainCategoryId)
              .map(subCategory => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.subCategoryName}
                </option>
              ))}
          </select>
        </div>

        <input
          className={styles.input}
          type="text"
          placeholder="#글 제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="#이미지 주소를 입력해주세요"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {imageUrl && (
          <div className={styles.imagePreviewContainer}>
            <img src={imageUrl} alt="Preview" className={styles.imagePreview} />
          </div>
        )}

        <textarea
          className={styles.textarea}
          placeholder="#글 본문을 작성해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h6 className={styles.tagInstructions}>#을 사용하여 태그를 작성해보세요 (최대 3개)</h6>

        <div className={styles.tagContainer}>
          <input
            className={`${styles.input} ${styles.tagInput}`}
            type="text"
            placeholder="#태그를 작성해주세요"
            value={tag1}
            onChange={(e) => setTag1(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.tagInput}`}
            type="text"
            placeholder="#태그를 작성해주세요"
            value={tag2}
            onChange={(e) => setTag2(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.tagInput}`}
            type="text"
            placeholder="#태그를 작성해주세요"
            value={tag3}
            onChange={(e) => setTag3(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button className={styles.submitButton} type="submit">수정하기</button>
        </div>
      </form>
    </div>
  );
}
