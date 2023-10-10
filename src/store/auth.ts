/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from 'types/authType';

const initialState: AuthState = {
  isAuth: false,
  error: [],
  isLoading: false,
  isAdmin: false,
  staffDetail: {} as any,
  roles: {

  },
  defaultFactory: {},
};

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setIsAuth($state, action: PayloadAction<boolean>) {
      $state.isAuth = action.payload;
    },
    loginError($state, action: PayloadAction<any>) {
      $state.error = action.payload;
    },
    setStaffDetail($state, action: PayloadAction<{
        staffDetail: any,
        roles: any,
        isAdmin: any,
        error?: [],
        defaultFactory: any,
    }>) {
      $state.isAdmin = action.payload.isAdmin;
      $state.staffDetail = action.payload.staffDetail;
      $state.roles = action.payload.roles;
      $state.error = action.payload.error || [];
      $state.defaultFactory = action.payload.defaultFactory || [];
    },
  },
});

export const { loginError, setIsAuth, setStaffDetail } = authSlice.actions;

export default authSlice.reducer;
