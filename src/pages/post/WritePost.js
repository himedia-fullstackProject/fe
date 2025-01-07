import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainCategoriesAsync, fetchSubCategoriesAsync, selectMainCategories, selectSubCategories, selectError } from '../../redux/categorySlice';
import { addPost } from '../../api/postapi'; // 포스트 추가 API 호출 함수 임포트
import styles from '../../css/WritePost.module.css';

const WritePost = () => {
    const dispatch = useDispatch();
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);
    const error = useSelector(selectError);

    const [title, setTitle] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tag1, setTag1] = React.useState('');
    const [tag2, setTag2] = React.useState('');
    const [tag3, setTag3] = React.useState('');
    const [mainCategoryId, setMainCategoryId] = React.useState('');
    const [subCategoryId, setSubCategoryId] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    useEffect(() => {
        dispatch(fetchMainCategoriesAsync()); // 메인 카테고리 가져오기
        dispatch(fetchSubCategoriesAsync()); // 서브 카테고리 가져오기
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // 제출 상태 설정

        try {
            const postDTO = {
                title,
                image: imageUrl,
                description,
                tag1,
                tag2,
                tag3,
                mainCategoryId,
                subCategoryId,
            };

            await addPost(postDTO); // 포스트 추가 API 호출

            alert('포스트가 성공적으로 작성되었습니다!');
            // 상태 초기화
            setTitle('');
            setImageUrl('');
            setDescription('');
            setTag1('');
            setTag2('');
            setTag3('');
            setMainCategoryId('');
            setSubCategoryId('');
        } catch (error) {
            console.error("포스트 작성 중 오류 발생:", error);
        } finally {
            setIsSubmitting(false); // 제출 상태 초기화
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>#게시글 작성하기</h1>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit}>
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
                        <option value="" disabled>대분류 카테고리 선택</option>
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
                        <option value="" disabled>소분류 카테고리 선택</option>
                        {subCategories
                            .filter(subCategory => subCategory.mainCategoryId === mainCategoryId) // 메인 카테고리에 따라 필터링
                            .map(subCategory => (
                                <option key={subCategory.id} value={subCategory.id}>
                                    {subCategory.subCategoryName} {/* 서브 카테고리 이름 */}
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
                    <button className={styles.submitButton} type="submit" disabled={isSubmitting}>등록 하기</button>
                </div>
            </form>
        </div>
    );
};

export default WritePost;
