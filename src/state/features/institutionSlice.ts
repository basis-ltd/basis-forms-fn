import { createSlice } from '@reduxjs/toolkit';

export const institutionSlice = createSlice({
  name: 'institution',
  initialState: {
    institutionsList: [],
    selectedInstitution: null,
    createInstitutionModal: false,
  },
  reducers: {
    setInstitutionsList: (state, action) => {
      state.institutionsList = action.payload;
    },
    updateInstitutionsList: (state, action) => {
        state.institutionsList = [action.payload as never, ...state.institutionsList];
    },
    setSelectedInsitution: (state, action) => {
        state.selectedInstitution = action.payload;
    },
    setCreateInstitutionModal: (state, action) => {
        state.createInstitutionModal = action.payload;
    },
  },
});

export const {
  setInstitutionsList,
  updateInstitutionsList,
  setSelectedInsitution,
  setCreateInstitutionModal,
} = institutionSlice.actions;

export default institutionSlice.reducer;
