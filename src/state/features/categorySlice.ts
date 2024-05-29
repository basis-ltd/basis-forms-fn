import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoriesList: [],
        selectedCategory: null,
        createCategoryModal: false,
    },
    reducers: {
        setCategoriesList: (state, action) => {
        state.categoriesList = action.payload;
        },
        updateCategoriesList: (state, action) => {
        state.categoriesList = [action.payload as never, ...state.categoriesList];
        },
        setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
        },
        setCreateCategoryModal: (state, action) => {
        state.createCategoryModal = action.payload;
        },
    },
});

export const {
    setCategoriesList,
    updateCategoriesList,
    setSelectedCategory,
    setCreateCategoryModal,
} = categorySlice.actions;

export default categorySlice.reducer;
