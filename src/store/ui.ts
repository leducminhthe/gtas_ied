/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const matches = window.innerWidth > 1024;
const initialState = {
  isOpen: false,
};

export const authSlice = createSlice({
  name: 'uiReducer',
  initialState,
  reducers: {
    setIsOpen($state, action: PayloadAction<boolean>) {
      $state.isOpen = action.payload;
    },
    setIsClose($state, action: PayloadAction<boolean>) {
      $state.isOpen = action.payload;
    },
  },
});

export const { setIsClose, setIsOpen } = authSlice.actions;

export default authSlice.reducer;
