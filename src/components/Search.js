import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/api';
import errorDisplay from '../api/errorDisplay';
import style from '../css/Search.module.css'; // 필요한 스타일을 추가하세요.

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/posts/search', {
                searchTerm,
                mainCategoryId,
                subCategoryId,
                searchType: 'all', // 또는 사용자가 선택한 검색 유형
            });
            // 검색 결과를 처리하는 방법에 따라 페이지를 이동하거나 상태를 업데이트합니다.
            navigate(`/searchresult`, { state: { posts: response.data } });
        } catch (error) {
            errorDisplay(error);
        }
    };

    return (
        <form onSubmit={handleSearch} className={style.search_form}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력"
                className={style.search_input}
                required
            />
            <select onChange={(e) => setMainCategoryId(e.target.value)} className={style.category_select}>
                <option value="">대분류 선택</option>
                {/* 카테고리 목록을 동적으로 생성할 수 있습니다. */}
                <option value="1">카테고리 1</option>
                <option value="2">카테고리 2</option>
            </select>
            <select onChange={(e) => setSubCategoryId(e.target.value)} className={style.category_select}>
                <option value="">소분류 선택</option>
                {/* 소분류 목록을 동적으로 생성할 수 있습니다. */}
                <option value="1">소분류 1</option>
                <option value="2">소분류 2</option>
            </select>
            <button type="submit" className={style.search_button}>검색</button>
        </form>
    );
};

export default Search;
