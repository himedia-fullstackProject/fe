import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/api'; 
import errorDisplay from '../../api/errorDisplay';
import styles from '../../css/WritePost.module.css';

const WritePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.jwtToken);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // 로그인 상태 확인
        if (!token) {
            navigate('/login'); // 로그인 페이지로 리다이렉트
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            await apiClient.post('/api/posts', postDTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('포스트가 성공적으로 작성되었습니다!');
            // 입력 필드 초기화
            setTitle('');
            setImageUrl('');
            setDescription('');
            setTag1('');
            setTag2('');
            setTag3('');
            setMainCategoryId('');
            setSubCategoryId('');
            navigate('/'); // 홈으로 리다이렉트
        } catch (error) {
            const errorMessage = errorDisplay(error);
            console.error("포스트 작성 중 오류 발생:", errorMessage);
            setError(errorMessage);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>#게시글 작성하기</h1>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.categoryContainer}>
                    <input
                        className={`${styles.input} ${styles.categoryInput}`}
                        type="number"
                        placeholder="#대분류 카테고리"
                        value={mainCategoryId}
                        onChange={(e) => setMainCategoryId(e.target.value)}
                        required
                    />
                    <input
                        className={`${styles.input} ${styles.categoryInput}`}
                        type="number"
                        placeholder="#소분류 카테고리"
                        value={subCategoryId}
                        onChange={(e) => setSugibCategoryId(e.target.value)}
                        required
                    />
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
                    onChange={handleUrlChange}
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
                    <button className={styles.submitButton} type="submit">등록 하기</button>
                </div>
            </form>
        </div>
    );
};

export default WritePost;
