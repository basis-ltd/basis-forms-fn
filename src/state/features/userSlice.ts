import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [],
    selectedUser: null,
    createUserModal: false,
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    updateUsersList: (state, { payload }) => {
      state.usersList = [payload as never, ...state.usersList];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setCreateUserModal: (state, action) => {
      state.createUserModal = action.payload;
    }
  },
});

export const { setUsersList, updateUsersList, setSelectedUser, setCreateUserModal } =
  userSlice.actions;

export default userSlice.reducer;
