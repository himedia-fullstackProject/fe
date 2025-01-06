// src/pages/post/category/CategoryPage.js
import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/api'; // API 클라이언트 가져오기
import { useDispatch, useSelector } from 'react-redux';
import { setSubcategories } from '../../../redux/postSlice'; // 리듀서 임포트

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [subcategories, setSubcategoriesState] = useState([]); // 서브카테고리 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await apiClient.get('/api/subcategories'); // 서브카테고리 API 호출
                setSubcategoriesState(response.data); // 서브카테고리 설정
                dispatch(setSubcategories(response.data)); // 서브카테고리 Redux 상태 설정
            } catch (error) {
                setError("서브카테고리를 가져오는 데 실패했습니다."); // 에러 메시지 설정
                console.error("Failed to fetch subcategories:", error);
            }
        };

        fetchSubcategories();
    }, [dispatch]);

    return (
        <div>
            {error && <div className="error-message">{error}</div>} {/* 에러 메시지 표시 */}
            <h2>서브카테고리</h2>
            {subcategories.map(subcategory => (
                <div key={subcategory.id}>
                    <h3>{subcategory.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryPage;
