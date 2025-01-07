import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../api/postapi'; // API 호출 함수 임포트

// 비동기 thunk를 사용하여 API 호출
export const fetchCategoriesAsync = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetchCategories(); // API 호출
        return response; // API 응답 반환
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        mainCategories: [],
        subCategories: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.mainCategories = action.payload.mainCategories; // 메인 카테고리 업데이트
                state.subCategories = action.payload.subCategories; // 서브 카테고리 업데이트
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.error = action.error.message; // 에러 메시지 저장
            });
    },
});

// 기본 내보내기
export const selectMainCategories = (state) => state.categories.mainCategories;
export const selectSubCategories = (state) => state.categories.subCategories;
export const selectError = (state) => state.categories.error;

export default categorySlice.reducer;
