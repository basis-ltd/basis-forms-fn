import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [],
    selectedUser: null,
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    updateUsersList: (state, { payload }) => {
      state.usersList = [payload, ...state.usersList];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsersList, updateUsersList, setSelectedUser } =
  userSlice.actions;

export default userSlice.reducer;
