import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: "form",
    initialState: {
        formsList: [],
        selectedForm: null,
        createFormModal: false,
    },
    reducers: {
        setFormsList: (state, action) => {
        state.formsList = action.payload;
        },
        updateFormsList: (state, action) => {
        state.formsList = [action.payload as never, ...state.formsList];
        },
        setSelectedForm: (state, action) => {
        state.selectedForm = action.payload;
        },
        setCreateFormModal: (state, action) => {
        state.createFormModal = action.payload;
        },
    },
});

export const {
    setFormsList,
    updateFormsList,
    setSelectedForm,
    setCreateFormModal,
} = formSlice.actions;

export default formSlice.reducer;
