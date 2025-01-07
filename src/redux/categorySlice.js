import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMainCategories, fetchSubCategories } from '../api/postapi'; // API 호출 함수 임포트

// 메인 카테고리 비동기 thunk
export const fetchMainCategoriesAsync = createAsyncThunk(
    'categories/fetchMainCategories',
    async () => {
        const response = await fetchMainCategories(); // 메인 카테고리 API 호출
        return response; // API 응답 반환
    }
);

// 서브 카테고리 비동기 thunk
export const fetchSubCategoriesAsync = createAsyncThunk(
    'categories/fetchSubCategories',
    async () => {
        const response = await fetchSubCategories(); // 서브 카테고리 API 호출
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
            .addCase(fetchMainCategoriesAsync.fulfilled, (state, action) => {
                state.mainCategories = action.payload; // 메인 카테고리 업데이트
            })
            .addCase(fetchSubCategoriesAsync.fulfilled, (state, action) => {
                state.subCategories = action.payload; // 서브 카테고리 업데이트
            })
            .addCase(fetchMainCategoriesAsync.rejected, (state, action) => {
                console.error("메인 카테고리 가져오기 실패:", action.error); // 에러 메시지 로그
                state.error = action.error.message; // 에러 메시지 저장
            })
            .addCase(fetchSubCategoriesAsync.rejected, (state, action) => {
                console.error("서브 카테고리 가져오기 실패:", action.error); // 에러 메시지 로그
                state.error = action.error.message; // 에러 메시지 저장
            });
    },
});

// 기본 내보내기
export const selectMainCategories = (state) => state.categories.mainCategories;
export const selectSubCategories = (state) => state.categories.subCategories;
export const selectError = (state) => state.categories.error;

export default categorySlice.reducer;
